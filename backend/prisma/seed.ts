import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// @ts-ignore
import { brandsData } from '../../src/data/brandsData.js';
import content from '../../src/data/content.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'prabaljaiswal69420@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'prabal@123';

  // Seed Admin User
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN', passwordHash },
    create: {
      email,
      name: 'Portfolio Admin',
      role: 'ADMIN',
      passwordHash,
      isEmailVerified: true,
    },
  });
  console.log(`✓ Admin user seeded: ${email}`);

  // Seed Design Collections
  const defaultCollections = [
    { code: '01', label: 'BRANDS', order: 1 },
    { code: '02', label: 'CLIENTS', order: 2 },
    { code: '03', label: 'SOCIALS', order: 3 },
    { code: '04', label: 'PRODUCTS', order: 4 },
    { code: '05', label: 'EVENTS', order: 5 },
  ];
  for (const c of defaultCollections) {
    await prisma.designCollection.upsert({
      where: { code: c.code },
      update: { label: c.label, order: c.order },
      create: { code: c.code, label: c.label, order: c.order, status: 'PUBLISHED' },
    });
  }
  console.log(`✓ Seeded Default Collections`);

  // Seed Brand Cards & Brand Works
  for (let i = 0; i < brandsData.length; i++) {
    const b = brandsData[i];
    await prisma.brandCard.upsert({
      where: { slug: b.slug },
      update: {
        name: b.name,
        collectionId: b.collectionId || '01',
        year: b.year || '2026',
        worksCount: b.worksCount || 0,
        brandType: b.type || 'Brand Identity',
        role: b.role || 'Lead Designer',
        overview: b.overview || '',
        isHot: Boolean(b.isHot),
        order: i,
      },
      create: {
        name: b.name,
        slug: b.slug,
        collectionId: b.collectionId || '01',
        year: b.year || '2026',
        worksCount: b.worksCount || 0,
        brandType: b.type || 'Brand Identity',
        role: b.role || 'Lead Designer',
        overview: b.overview || '',
        isHot: Boolean(b.isHot),
        order: i,
        status: 'PUBLISHED',
      },
    });

    // Brand works
    const works = b.allWorks || [];
    for (let j = 0; j < works.length; j++) {
      const w = works[j];
      const workId = w.id || `bw-${b.slug}-${j}`;
      const existing = await prisma.brandWork.findFirst({ where: { id: workId } });
      if (!existing) {
        await prisma.brandWork.create({
          data: {
            id: workId,
            brandSlug: b.slug,
            title: w.title,
            description: w.description || '',
            category: w.category || 'BRANDING',
            year: w.year || b.year || '2026',
            imageUrl: w.image || '',
            order: j,
            status: 'PUBLISHED',
          },
        });
      }
    }
  }
  console.log(`✓ Seeded ${brandsData.length} Brand Cards and their works`);

  // Seed Design Projects from brandsData
  const catMap: Record<string, string> = {
    PACKAGING: 'Packaging',
    'SOCIAL MEDIA': 'Social Media',
    BRANDING: 'Branding',
    CAMPAIGNS: 'Branding',
    EDITORIAL: 'Print',
    TYPOGRAPHY: 'Print',
    EVENTS: 'Branding',
    'UI/UX': 'UI/UX',
    PRINT: 'Print',
    ILLUSTRATIONS: 'Illustrations',
    REELS: 'Reels',
    BANNERS: 'Banners',
    'LARGE FORMAT': 'Large Format',
    PRODUCTS: 'Branding',
  };

  for (let i = 0; i < brandsData.length; i++) {
    const b = brandsData[i];
    await prisma.designProject.upsert({
      where: { slug: b.slug },
      update: {
        title: b.name,
        description: b.overview || `Design work for ${b.name}.`,
        category: catMap[b.stats?.categories?.[0] || 'BRANDING'] || 'Branding',
        client: b.name,
        thumbnailUrl: b.allWorks?.[0]?.image || '',
        order: i,
        status: 'PUBLISHED',
      },
      create: {
        title: b.name,
        slug: b.slug,
        description: b.overview || `Design work for ${b.name}.`,
        category: catMap[b.stats?.categories?.[0] || 'BRANDING'] || 'Branding',
        client: b.name,
        softwareUsed: JSON.stringify(['Photoshop', 'Illustrator', 'Figma']),
        tags: JSON.stringify((b.stats?.categories || []).map((c: string) => catMap[c] || c)),
        thumbnailUrl: b.allWorks?.[0]?.image || '',
        order: i,
        status: 'PUBLISHED',
      },
    });
  }
  console.log(`✓ Seeded ${brandsData.length} Design Projects`);

  // Seed Languages
  if (content.programming) {
    for (let i = 0; i < content.programming.length; i++) {
      const l = content.programming[i] as any;
      const slug = l.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const levelStr = l.experience || l.level || '';
      await prisma.language.upsert({
        where: { slug },
        update: { name: l.name, level: levelStr, order: i },
        create: { name: l.name, slug, level: levelStr, order: i, status: 'PUBLISHED' },
      });
    }
    console.log(`✓ Seeded Languages`);
  }

  // Seed Showcase Items
  if (content.showcase) {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&auto=format&fit=crop&q=80',
    ];
    for (let i = 0; i < content.showcase.length; i++) {
      const s = content.showcase[i];
      const slug = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await prisma.showcaseItem.upsert({
        where: { slug },
        update: { title: s.title, description: s.category || '', order: i },
        create: { title: s.title, slug, description: s.category || '', linkUrl: fallbackImages[i % fallbackImages.length], order: i, status: 'PUBLISHED' },
      });
    }
    console.log(`✓ Seeded Showcase Items`);
  }

  // Seed Achievements
  if (content.achievements) {
    for (let i = 0; i < content.achievements.length; i++) {
      const a = content.achievements[i];
      const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await prisma.achievement.upsert({
        where: { slug },
        update: { title: a.title, description: a.description || '', type: a.type || '', year: a.year || '', order: i },
        create: { title: a.title, slug, description: a.description || '', type: a.type || '', year: a.year || '', order: i, status: 'PUBLISHED' },
      });
    }
    console.log(`✓ Seeded Achievements`);
  }

  // Seed Testimonials
  if (content.testimonials) {
    for (let i = 0; i < content.testimonials.length; i++) {
      const t = content.testimonials[i];
      const slug = t.author.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await prisma.testimonial.upsert({
        where: { slug },
        update: { name: t.author, role: t.role || '', quote: t.quote || '', order: i },
        create: { name: t.author, slug, role: t.role || '', quote: t.quote || '', order: i, status: 'PUBLISHED' },
      });
    }
    console.log(`✓ Seeded Testimonials`);
  }

  // Seed Tech Tools
  if (content.techStack) {
    const devTools = (content.techStack.development || []).map((t: any, i: number) => ({ ...t, category: 'development', order: i }));
    const designTools = (content.techStack.design || []).map((t: any, i: number) => ({ ...t, category: 'design', order: i }));
    const allTools = [...devTools, ...designTools];
    for (let i = 0; i < allTools.length; i++) {
      const t = allTools[i];
      const slug = t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      await prisma.techTool.upsert({
        where: { slug },
        update: { name: t.name, category: t.category, color: t.color || '', order: i },
        create: { name: t.name, slug, category: t.category, color: t.color || '', order: i, status: 'PUBLISHED' },
      });
    }
    console.log(`✓ Seeded Tech Tools`);
  }

  console.log('Database seeding complete!');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
