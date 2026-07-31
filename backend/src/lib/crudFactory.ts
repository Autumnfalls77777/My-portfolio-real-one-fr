import type { Request, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { prisma } from '../config/database.js';
import { audit } from './audit.js';
import { ApiError } from './apiError.js';
import { created, ok } from './response.js';
import { listQuerySchema, orderBy, pageMeta, pagination } from './queryBuilder.js';
import { toSlug } from './slug.js';
import { asyncHandler } from './asyncHandler.js';

type Delegate = {
  findMany(args: unknown): Promise<unknown[]>;
  findFirst(args: unknown): Promise<unknown>;
  findUnique(args: unknown): Promise<unknown>;
  count(args: unknown): Promise<number>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
  delete?(args: unknown): Promise<unknown>;
};

type CrudConfig = {
  modelName: string;
  entityType: string;
  delegate: Delegate;
  createSchema: ZodTypeAny;
  updateSchema: ZodTypeAny;
  allowedSorts: string[];
  searchFields: string[];
  defaultInclude?: Record<string, unknown>;
  transformCreate?: (body: Record<string, unknown>) => Record<string, unknown>;
  transformUpdate?: (body: Record<string, unknown>) => Record<string, unknown>;
};

function sanitizeForPrisma(data: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      result[key] = JSON.stringify(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function sanitizeItemForResponse(item: any): any {
  if (!item || typeof item !== 'object') return item;
  if (Array.isArray(item)) {
    return item.map(sanitizeItemForResponse);
  }
  const result = { ...item };
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
      try {
        result[key] = JSON.parse(value);
      } catch {}
    }
  }
  return result;
}

function parseListQuery(queryObj: unknown) {
  const parseResult = listQuerySchema.safeParse(queryObj);
  if (!parseResult.success) {
    throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid query parameters', parseResult.error.flatten());
  }
  return parseResult.data;
}

export function createCrudController(config: CrudConfig) {
  const listPublic = asyncHandler(async (req: Request, res: Response) => {
    const query = parseListQuery(req.query);
    const where = buildWhere(query, config.searchFields, false);
    const [items, total] = await Promise.all([
      config.delegate.findMany({
        where,
        ...pagination(query),
        orderBy: orderBy(query, config.allowedSorts),
        include: config.defaultInclude
      }),
      config.delegate.count({ where })
    ]);
    ok(res, sanitizeItemForResponse(items), pageMeta(total, query));
  });

  const listAdmin = asyncHandler(async (req: Request, res: Response) => {
    const query = parseListQuery(req.query);
    const where = buildWhere(query, config.searchFields, true);
    const [items, total] = await Promise.all([
      config.delegate.findMany({
        where,
        ...pagination(query),
        orderBy: orderBy(query, config.allowedSorts),
        include: config.defaultInclude
      }),
      config.delegate.count({ where })
    ]);
    ok(res, sanitizeItemForResponse(items), pageMeta(total, query));
  });

  const getPublic = asyncHandler(async (req: Request, res: Response) => {
    const slug = String(req.params.slug);
    const item = await config.delegate.findFirst({
      where: { slug, status: 'PUBLISHED', deletedAt: null },
      include: config.defaultInclude
    });
    if (!item) throw new ApiError(404, 'NOT_FOUND', `${config.entityType} not found`);
    ok(res, sanitizeItemForResponse(item));
  });

  const getAdmin = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const item = await config.delegate.findUnique({
      where: { id },
      include: config.defaultInclude
    });
    if (!item) throw new ApiError(404, 'NOT_FOUND', `${config.entityType} not found`);
    ok(res, sanitizeItemForResponse(item));
  });

  const create = asyncHandler(async (req: Request, res: Response) => {
    const parsed = config.createSchema.parse(req.body);
    const rawData = config.transformCreate ? config.transformCreate(parsed) : parsed;
    const data = sanitizeForPrisma(rawData);
    const createData: Record<string, unknown> = {
      ...data,
      slug: data.slug || toSlug(String(data.title ?? data.name ?? data.code ?? data.company ?? Math.random().toString(36).substr(2, 6))),
      publishedAt: data.status === 'PUBLISHED' ? new Date() : data.publishedAt
    };

    let item;
    try {
      item = await config.delegate.create({
        data: createData,
        include: config.defaultInclude
      });
    } catch (err: any) {
      if (err?.message?.includes?.('publishedAt')) {
        delete createData.publishedAt;
        item = await config.delegate.create({
          data: createData,
          include: config.defaultInclude
        });
      } else {
        throw err;
      }
    }
    await audit(req, `${config.modelName}.created`, config.entityType, (item as { id?: string }).id, undefined, item);
    created(res, sanitizeItemForResponse(item));
  });

  const update = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const before = await config.delegate.findUnique({ where: { id } });
    if (!before) throw new ApiError(404, 'NOT_FOUND', `${config.entityType} not found`);

    const parsed = config.updateSchema.parse(req.body);
    const rawData = config.transformUpdate ? config.transformUpdate(parsed) : parsed;
    const data = sanitizeForPrisma(rawData);

    const item = await config.delegate.update({
      where: { id },
      data,
      include: config.defaultInclude
    });
    await audit(req, `${config.modelName}.updated`, config.entityType, id, before, item);
    ok(res, sanitizeItemForResponse(item));
  });

  const softDelete = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const before = await config.delegate.findUnique({ where: { id } });
    if (!before) throw new ApiError(404, 'NOT_FOUND', `${config.entityType} not found`);
    let item;
    // Always hard-delete so records are truly gone from DB and never reappear
    if (typeof config.delegate.delete === 'function') {
      item = await config.delegate.delete({ where: { id } });
    } else {
      // Fallback: soft-delete via deletedAt
      item = await config.delegate.update({
        where: { id },
        data: { deletedAt: new Date(), status: 'ARCHIVED' },
        include: config.defaultInclude
      });
    }
    await audit(req, `${config.modelName}.deleted`, config.entityType, id, before, item);
    ok(res, sanitizeItemForResponse(item));
  });

  const publish = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const item = await config.delegate.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date(), deletedAt: null },
      include: config.defaultInclude
    });
    await audit(req, `${config.modelName}.published`, config.entityType, id, undefined, item);
    ok(res, sanitizeItemForResponse(item));
  });

  const archive = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const item = await config.delegate.update({
      where: { id },
      data: { status: 'ARCHIVED' },
      include: config.defaultInclude
    });
    await audit(req, `${config.modelName}.archived`, config.entityType, id, undefined, item);
    ok(res, sanitizeItemForResponse(item));
  });

  const restore = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const item = await config.delegate.update({
      where: { id },
      data: { deletedAt: null },
      include: config.defaultInclude
    });
    await audit(req, `${config.modelName}.restored`, config.entityType, id, undefined, item);
    ok(res, sanitizeItemForResponse(item));
  });

  return { listPublic, listAdmin, getPublic, getAdmin, create, update, softDelete, publish, archive, restore };
}

function buildWhere(query: ReturnType<typeof parseListQuery>, searchFields: string[], admin: boolean) {
  // Always exclude soft-deleted records. Admin sees all statuses; public only sees PUBLISHED.
  const where: Record<string, unknown> = admin
    ? { deletedAt: null }
    : { status: 'PUBLISHED', deletedAt: null };
  if (query.status) where.status = query.status.toUpperCase();
  if (query.category) where.category = query.category;
  if (query.featured !== undefined) where.featured = query.featured;
  if (query.search) {
    where.OR = searchFields.map((field) => ({ [field]: { contains: query.search } }));
  }
  return where;
}

export { prisma };
