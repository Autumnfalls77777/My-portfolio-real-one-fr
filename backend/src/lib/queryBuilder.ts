import { z } from 'zod';

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(1000).default(12),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().trim().optional(),
  status: z.string().trim().optional(),
  category: z.string().trim().optional(),
  featured: z.coerce.boolean().optional()
});

export type ListQuery = z.infer<typeof listQuerySchema>;

export function pagination(query: ListQuery) {
  return {
    skip: (query.page - 1) * query.limit,
    take: query.limit
  };
}

export function pageMeta(total: number, query: ListQuery) {
  const totalPages = Math.max(1, Math.ceil(total / query.limit));
  return {
    total,
    page: query.page,
    limit: query.limit,
    totalPages,
    hasNextPage: query.page < totalPages,
    hasPrevPage: query.page > 1
  };
}

export function orderBy(query: ListQuery, allowedSorts: string[]) {
  const sort = allowedSorts.includes(query.sort) ? query.sort : 'createdAt';
  return { [sort]: query.order };
}
