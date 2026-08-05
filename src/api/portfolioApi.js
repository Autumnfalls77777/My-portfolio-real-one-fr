import content from '../data/content.json';
import { brandsData } from '@/data/brandsData';

const defaultExperiences = [
  {
    id: "exp-1",
    title: "Lead Web Developer & UI Designer",
    company: "Pixel Perfect Agency",
    company_logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=150&auto=format&fit=crop&q=60",
    role: "Full-Time",
    is_internship: false,
    duration: "Jan 2023 - Present",
    start_date: "2023-01-01",
    end_date: "Present",
    location: "San Francisco, CA (Remote)",
    description: "Lead the frontend team in developing high-performance React web applications. Architected responsive design systems and unified brand assets.",
    learnings: [
      "Optimized build configurations reducing initial bundle sizes by 35%.",
      "Mentored junior developers and established code styling standards.",
      "Implemented accessibility guidelines (WCAG 2.1 AA) across core user journeys."
    ],
    skills: ["React", "Tailwind CSS", "Vite", "Figma", "Design Systems"],
    recommended: true,
    recommendation_text: "Prabal is an exceptional developer who has a rare eye for design. His work has elevated our client deliverables significantly.",
    recommendation_author: "Sarah Jenkins",
    recommendation_role: "Creative Director",
    order: 1
  },
  {
    id: "exp-2",
    title: "UI/UX Design Intern",
    company: "Creative Labs",
    company_logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=60",
    role: "Internship",
    is_internship: true,
    duration: "Jun 2022 - Dec 2022",
    start_date: "2022-06-01",
    end_date: "2022-12-31",
    location: "New York, NY",
    description: "Collaborated with product designers to map user flows, build interactive high-fidelity Figma prototypes, and conduct usability testing.",
    learnings: [
      "Conducted 12 usability testing sessions providing insights that shaped the product roadmap.",
      "Built and maintained a modular Figma component library."
    ],
    skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
    recommended: false,
    order: 2
  }
];

const defaultCertificates = [
  {
    id: "cert-1",
    title: "Google UX Design Professional Certificate",
    category: "Design",
    image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&auto=format&fit=crop&q=60",
    issuer: "Google (via Coursera)",
    date: "August 2022",
    description: "Professional training in UX research, wireframing, high-fidelity prototyping, and responsive web design.",
    featured: true,
    order: 1
  },
  {
    id: "cert-2",
    title: "Advanced React & Next.js Masterclass",
    category: "Development",
    image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=60",
    issuer: "Frontend Masters",
    date: "November 2023",
    description: "In-depth course on performance optimization, server-side rendering, routing, and state management in React.",
    featured: false,
    order: 2
  }
];

const defaultResumeDocuments = [
  {
    id: "doc-1",
    title: "Prabal_Resume_2026.pdf",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "Resume"
  },
  {
    id: "doc-2",
    title: "Prabal_CV_2026.pdf",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    type: "CV"
  }
];

// Helper to convert camelCase to snake_case
const camelToSnake = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnake);
  }
  if (obj !== null && typeof obj === 'object') {
    const snake = {};
    for (const key in obj) {
      let snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      if (key === 'liveDemo') snakeKey = 'live_demo_url';
      if (key === 'github') snakeKey = 'github_url';
      if (key === 'completionDate') snakeKey = 'completion_date';
      if (key === 'personalNotes') snakeKey = 'personal_notes';
      if (key === 'teamProject') snakeKey = 'team_project';
      if (key === 'techStack') snakeKey = 'tech_stack';
      if (key === 'type') snakeKey = 'project_type';
      if (key === 'software') snakeKey = 'software_used';
      if (key === 'personalNote') snakeKey = 'personal_note';
      if (key === 'caseStudy') snakeKey = 'case_study_url';
      if (key === 'imageUrl') snakeKey = 'image_url';
      if (key === 'fileUrl') snakeKey = 'file_url';
      snake[snakeKey] = camelToSnake(obj[key]);
    }
    return snake;
  }
  return obj;
};

// Helper to seed localStorage
const getOrSeed = (entityName, defaultFactory) => {
  const key = `portfolio_entity_${entityName}`;
  const seededKey = `portfolio_seeded_${entityName}`;
  const stored = localStorage.getItem(key);
  const isSeeded = localStorage.getItem(seededKey);

  if (stored !== null || isSeeded === 'true') {
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(`Error parsing ${key}, reseeding`, e);
    }
  }

  const data = defaultFactory();
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(seededKey, 'true');
  return data;
};

const getInitialData = (entityName) => {
  switch (entityName) {
    case 'Language':
      return getOrSeed(entityName, () => content.programming.map((l, i) => ({ ...l, id: `lang-${i}`, order: i })));
    case 'ShowcaseItem':
      return getOrSeed(entityName, () => {
        const fallbackImages = [
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/253f85944_generated_8e96df03.png",
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/b9f8a7fdd_generated_c8070f99.png",
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/7ac6ff41b_generated_49893c54.png",
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/6df0bb128_generated_c9f57ba9.png",
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/b838cb117_generated_7e69a8cd.png",
          "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/f2c547999_generated_41447b1a.png"
        ];
        return content.showcase.map((item, i) => ({
          ...item,
          image_url: fallbackImages[i % fallbackImages.length],
          order: i
        }));
      });
    case 'Achievement':
      return getOrSeed(entityName, () => content.achievements.map((ach, i) => ({ ...ach, id: `ach-${i}`, order: i })));
    case 'Testimonial':
      return getOrSeed(entityName, () => content.testimonials.map((t, i) => ({ ...t, id: `test-${i}`, order: i })));
    case 'TechTool':
      return getOrSeed(entityName, () => {
        const devTools = content.techStack.development.map((t, i) => ({ ...t, id: `dev-${i}`, category: 'development', order: i }));
        const designTools = content.techStack.design.map((t, i) => ({ ...t, id: `design-${i}`, category: 'design', order: i }));
        return [...devTools, ...designTools];
      });
    case 'CareerExperience':
      return getOrSeed(entityName, () => defaultExperiences);
    case 'Certificate':
      return getOrSeed(entityName, () => defaultCertificates);
    case 'ResumeDocument':
      return getOrSeed(entityName, () => defaultResumeDocuments);
    case 'OfferLetter':
      return getOrSeed(entityName, () => [
        {
          id: "offer-1",
          company: "Google",
          role: "Software Engineering Intern",
          date: "October 2025",
          file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          description: "Offer letter for Software Engineering internship at Google.",
          order: 1
        },
        {
          id: "offer-2",
          company: "Stripe",
          role: "Product Designer",
          date: "December 2025",
          file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          description: "Offer letter for Product Designer role at Stripe.",
          order: 2
        }
      ]);
    case 'BrandCard':
      return getOrSeed(entityName, () =>
        brandsData.map((b, i) => ({
          id: `bc-${b.id || b.slug}`,
          name: b.name,
          slug: b.slug,
          collection_id: b.collectionId || '01',
          year: b.year || '2026',
          works_count: b.worksCount || 0,
          brand_type: b.type || b.brandType || 'Brand Identity',
          role: b.role || 'Lead Designer',
          overview: b.overview || '',
          is_hot: b.isHot || false,
          order: i,
        }))
      );
    case 'BrandWork':
      return getOrSeed(entityName, () => {
        const works = [];
        brandsData.forEach(b => {
          (b.allWorks || []).forEach((w, i) => {
            works.push({
              id: w.id || `bw-${b.slug}-${i}`,
              brand_slug: b.slug,
              title: w.title,
              description: w.description || '',
              category: w.category || 'BRANDING',
              year: w.year || b.year || '2026',
              image_url: w.image || w.imageUrl || '',
              order: i,
            });
          });
        });
        return works;
      });
    case 'DesignProject':
      return getOrSeed(entityName, () => {
        const catMap = {
          PACKAGING: 'Packaging', 'SOCIAL MEDIA': 'Social Media', BRANDING: 'Branding',
          CAMPAIGNS: 'Branding', EDITORIAL: 'Print', TYPOGRAPHY: 'Print',
          EVENTS: 'Branding', 'UI/UX': 'UI/UX', PRINT: 'Print',
          ILLUSTRATIONS: 'Illustrations', REELS: 'Reels', BANNERS: 'Banners',
          'LARGE FORMAT': 'Large Format', PRODUCTS: 'Branding',
        };
        return brandsData.map((b, i) => ({
          id: `dp-${b.slug}`,
          title: b.name,
          description: b.overview || `Design work for ${b.name}.`,
          category: catMap[b.stats?.categories?.[0]] || 'Branding',
          date: b.year || '2026',
          client: b.name,
          team_project: false,
          software_used: ['Photoshop', 'Illustrator', 'Figma'],
          tags: (b.stats?.categories || []).map(c => catMap[c] || c),
          thumbnail: b.allWorks?.[0]?.image || '',
          overview: b.overview || '',
          personal_note: b.role || '',
          order: i,
        }));
      });
    case 'SoftwareProject':
      return getOrSeed(entityName, () => []);
    case 'FeaturedProject':
      return getOrSeed(entityName, () => []);
    case 'ContactMessage':
      return getOrSeed(entityName, () => []);
    default:
      return getOrSeed(entityName, () => []);
  }
};

const getEntityStore = (entityName) => {
  return getInitialData(entityName);
};

const saveEntityStore = (entityName, list) => {
  localStorage.setItem(`portfolio_entity_${entityName}`, JSON.stringify(list));
};

const sortEntities = (list, orderBy) => {
  if (!orderBy) return list;
  const isDesc = orderBy.startsWith('-');
  const field = isDesc ? orderBy.slice(1) : orderBy;
  
  return [...list].sort((a, b) => {
    let valA = a[field];
    let valB = b[field];

    if (valA === undefined || valA === null) return isDesc ? 1 : -1;
    if (valB === undefined || valB === null) return isDesc ? -1 : 1;

    if (typeof valA === 'string') {
      return isDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }
    return isDesc ? valB - valA : valA - valB;
  });
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const ADMIN_SESSION_KEY = 'portfolio_admin_session';
const USER_SESSION_KEY = 'portfolio_user_session';

const entityRoutes = {
  Achievement: { public: 'achievements', admin: 'admin/achievements' },
  BrandCard: { public: 'brand-cards', admin: 'admin/brand-cards' },
  BrandWork: { public: 'brand-works', admin: 'admin/brand-works' },
  CareerExperience: { public: 'career', admin: 'admin/career' },
  Certificate: { public: 'certificates', admin: 'admin/certificates' },
  ContactMessage: { public: 'contact', admin: 'admin/contact-messages' },
  DesignProject: { public: 'designs', admin: 'admin/designs' },
  DesignCollection: { public: 'design-collections', admin: 'admin/design-collections' },
  FeaturedProject: { public: 'software', admin: 'admin/software' },
  Language: { public: 'languages', admin: 'admin/languages' },
  OfferLetter: { public: 'offer-letters', admin: 'admin/offer-letters' },
  ResumeDocument: { public: 'resumes', admin: 'admin/resumes' },
  ShowcaseItem: { public: 'showcase', admin: 'admin/showcase' },
  SoftwareProject: { public: 'software', admin: 'admin/software' },
  TechTool: { public: 'tech-tools', admin: 'admin/tech-tools' },
  Testimonial: { public: 'testimonials', admin: 'admin/testimonials' },
};

// All entities are persisted exclusively in SQLite database (/database/portfolio.db) via backend API
const remoteOnlyEntities = new Set([
  'Achievement',
  'BrandCard',
  'BrandWork',
  'CareerExperience',
  'Certificate',
  'ContactMessage',
  'DesignCollection',
  'DesignProject',
  'FeaturedProject',
  'Language',
  'OfferLetter',
  'ResumeDocument',
  'ShowcaseItem',
  'SoftwareProject',
  'TechTool',
  'Testimonial',
]);

const toCamel = (key) => key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

const getCookie = (name) => {
  if (typeof document === 'undefined') return '';
  return document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=') || '';
};

let cachedCsrfToken = '';

async function ensureCsrfToken() {
  if (cachedCsrfToken) return cachedCsrfToken;
  const cookieVal = getCookie('csrf_token');
  if (cookieVal) {
    cachedCsrfToken = cookieVal;
    return cachedCsrfToken;
  }
  try {
    const res = await fetch(`${API_BASE}/auth/csrf`, { credentials: 'include' });
    const headerToken = res.headers.get('X-CSRF-Token');
    const json = await res.json().catch(() => ({}));
    const token = headerToken || json?.data?.csrfToken || json?.csrfToken || getCookie('csrf_token');
    if (token) cachedCsrfToken = token;
    return cachedCsrfToken;
  } catch (e) {
    return '';
  }
}

async function apiRequest(path, options = {}) {
  const method = options.method || 'GET';
  const headers = { ...(options.headers || {}) };

  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = await ensureCsrfToken();
    if (csrf) headers['X-CSRF-Token'] = decodeURIComponent(csrf);
  }

  try {
    const adminSession = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || '{}');
    if (adminSession?.token) {
      headers['Authorization'] = `Bearer ${adminSession.token}`;
      headers['X-Admin-Token'] = adminSession.token;
    }
  } catch {}

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers,
    body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    const code = payload?.error?.code || `HTTP_${response.status}`;
    const rawMsg = payload?.error?.message || payload?.message || response.statusText || 'Unknown server error';
    const err = new Error(`[${code}] ${rawMsg}`);
    err.status = response.status;
    err.code = code;
    err.details = payload;
    throw err;
  }
  return payload?.data ?? payload;
}

function isAdminSessionActive() {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
    return Boolean(session && Date.now() - session.ts <= 5 * 60 * 60 * 1000); // 5 hours
  } catch {
    return false;
  }
}

function backendSort(orderBy) {
  if (!orderBy) return 'order';
  const desc = orderBy.startsWith('-');
  const raw = desc ? orderBy.slice(1) : orderBy;
  const mapped = {
    created_date: 'createdAt',
    updated_date: 'updatedAt',
    completion_date: 'completionDate',
  }[raw] || toCamel(raw);
  return `${desc ? '-' : ''}${mapped}`;
}

function normalizeItem(entityName, item) {
  if (!item || typeof item !== 'object') return item;
  const mediaUrl = item.media?.secureUrl || item.media?.url || item.thumbnail?.secureUrl || item.thumbnail?.url || item.thumbnailUrl || '';
  const base = {
    ...item,
    created_date: item.createdAt,
    updated_date: item.updatedAt,
  };

  switch (entityName) {
    case 'BrandCard':
      return {
        ...base,
        slug: item.slug || '',
        collection_id: item.collectionId || item.collection_id || '01',
        works_count: item.worksCount || item.works_count || 0,
        brand_type: item.brandType || item.brand_type || '',
        is_hot: item.isHot || item.is_hot || false,
      };
    case 'BrandWork':
      return {
        ...base,
        brand_slug: item.brandSlug || item.brand_slug || '',
        image_url: item.media?.secureUrl || item.media?.url || item.imageUrl || item.image_url || '',
        category: item.category || '',
      };
    case 'Language':
      return {
        ...base,
        experience: item.level || '',
        projects: item.projects || 0,
        confidence: item.confidence || 80,
      };
    case 'SoftwareProject':
    case 'FeaturedProject':
      return {
        ...base,
        project_type: item.complexity || item.category || '',
        completion_date: item.displayDate || item.completionDate || '',
        status: item.status === 'PUBLISHED' ? 'Live' : item.status || 'In Progress',
        tech_stack: item.techStack || item.tags?.map((tag) => tag.tag?.name || tag).filter(Boolean) || [],
        github_url: item.githubUrl,
        live_demo_url: item.liveDemoUrl,
        problem_statement: item.problemStatement,
        future_improvements: item.futureImprovements,
        thumbnail_media_id: item.thumbnailId || '',
        thumbnail: mediaUrl,
        image_url: mediaUrl,
      };
    case 'DesignProject':
      return {
        ...base,
        date: item.displayDate || item.completionDate || '',
        team_project: item.teamProject || false,
        software_used: item.softwareUsed || [],
        color_palette: item.colorPalette || [],
        typography_specs: item.typographySpecs,
        case_study_url: item.caseStudyUrl,
        tags: item.tags || [],
        thumbnail_media_id: item.thumbnailId || '',
        thumbnail: mediaUrl,
      };
    case 'BrandCard':
      return {
        ...base,
        collection_id: item.collectionId || item.collection_id || '01',
        collectionId: item.collectionId || item.collection_id || '01',
        works_count: item.worksCount ?? item.works_count ?? 0,
        worksCount: item.worksCount ?? item.works_count ?? 0,
        brand_type: item.brandType || item.brand_type || '',
        brandType: item.brandType || item.brand_type || '',
        is_hot: Boolean(item.isHot ?? item.is_hot),
        isHot: Boolean(item.isHot ?? item.is_hot),
      };
    case 'BrandWork':
      return {
        ...base,
        brand_slug: item.brandSlug || item.brand_slug || '',
        brandSlug: item.brandSlug || item.brand_slug || '',
        image_url: item.imageUrl || item.image_url || '',
        imageUrl: item.imageUrl || item.image_url || '',
      };
    case 'DesignCollection':
      return {
        ...base,
        code: item.code,
        label: item.label,
      };
    case 'CareerExperience':
      return {
        ...base,
        company_logo: item.companyLogoUrl,
        is_internship: item.isInternship,
        start_date: item.startDate,
        end_date: item.endDate,
        recommendation_text: item.recommendationText,
        recommendation_author: item.recommendationAuthor,
        recommendation_role: item.recommendationRole,
      };
    case 'Certificate':
      return {
        ...base,
        image_url: mediaUrl,
        date: item.displayDate || item.issuedAt || '',
      };
    case 'OfferLetter':
      return {
        ...base,
        date: item.displayDate || item.offeredAt || '',
        file_url: mediaUrl,
      };
    case 'ResumeDocument':
      return {
        ...base,
        type: item.type === 'CV' ? 'CV' : 'Resume',
        file_url: mediaUrl,
      };
    case 'ShowcaseItem':
      return {
        ...base,
        image_url: mediaUrl,
      };
    case 'Testimonial':
      return {
        ...base,
        author: item.name,
      };
    default:
      return base;
  }
}

function normalizeList(entityName, data) {
  return Array.isArray(data) ? data.map((item) => normalizeItem(entityName, item)) : [];
}

function toApiPayload(entityName, data) {
  const source = { ...data };
  delete source.created_date;
  delete source.updated_date;
  delete source.created_by_id;

  const common = {
    ...source,
    status: source.status && ['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(source.status)
      ? source.status
      : 'PUBLISHED',
  };

  switch (entityName) {
    case 'BrandCard':
      return {
        name: source.name,
        slug: source.slug || source.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
        collectionId: source.collectionId || source.collection_id || '01',
        year: source.year || String(new Date().getFullYear()),
        worksCount: Number(source.worksCount ?? source.works_count ?? 0),
        brandType: source.brandType || source.brand_type || null,
        overview: source.overview || null,
        role: source.role || null,
        isHot: Boolean(source.isHot ?? source.is_hot),
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'BrandWork':
      return {
        brandSlug: source.brandSlug || source.brand_slug || '',
        title: source.title,
        description: source.description || null,
        category: source.category || null,
        year: source.year || String(new Date().getFullYear()),
        imageUrl: source.imageUrl || source.image_url || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'DesignCollection':
      return {
        code: source.code,
        label: source.label,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'Language':
      return {
        name: source.name,
        level: source.experience || source.level || '',
        category: source.category || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'TechTool':
      return {
        name: source.name,
        category: source.category,
        color: source.color || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'Achievement':
      return {
        title: source.title,
        description: source.description || null,
        type: source.type || null,
        year: source.year || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'ShowcaseItem':
      return {
        title: source.title,
        description: source.description || null,
        category: source.category || null,
        linkUrl: source.link_url || source.linkUrl || null,
        mediaId: source.media_id || source.mediaId || null,
        imageUrl: source.image_url || source.imageUrl || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'Testimonial':
      return {
        name: source.author || source.name,
        quote: source.quote,
        role: source.role || null,
        company: source.company || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'CareerExperience':
      return {
        title: source.title,
        company: source.company,
        role: source.role || null,
        companyLogoUrl: source.company_logo || source.companyLogoUrl || null,
        employmentType: source.is_internship ? 'INTERNSHIP' : 'FULL_TIME',
        isInternship: Boolean(source.is_internship),
        duration: source.duration || null,
        startDate: source.start_date || null,
        endDate: source.end_date || null,
        location: source.location || null,
        description: source.description,
        learnings: source.learnings || [],
        skills: source.skills || [],
        recommended: Boolean(source.recommended),
        recommendationText: source.recommendation_text || null,
        recommendationAuthor: source.recommendation_author || null,
        recommendationRole: source.recommendation_role || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'Certificate':
      return {
        title: source.title,
        category: source.category,
        issuer: source.issuer || null,
        displayDate: source.date || source.displayDate || null,
        description: source.description || null,
        featured: Boolean(source.featured),
        mediaId: source.media_id || source.mediaId || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'OfferLetter':
      return {
        company: source.company,
        role: source.role,
        displayDate: source.date || source.displayDate || null,
        description: source.description || null,
        mediaId: source.media_id || source.mediaId || null,
        fileUrl: source.file_url || source.fileUrl || null,
        order: Number(source.order || 0),
        status: common.status,
      };
    case 'ResumeDocument':
      return {
        title: source.title,
        type: String(source.type || 'Resume').toUpperCase() === 'CV' ? 'CV' : 'RESUME',
        mediaId: source.media_id || source.mediaId || null,
        fileUrl: source.file_url || source.fileUrl || null,
        status: common.status,
      };
    case 'SoftwareProject':
    case 'FeaturedProject':
      return {
        title: source.title,
        description: source.description,
        category: source.category || null,
        complexity: source.project_type || source.complexity || null,
        status: common.status,
        githubUrl: source.github_url || source.githubUrl || null,
        liveDemoUrl: source.live_demo_url || source.liveDemoUrl || null,
        problemStatement: source.problem_statement || null,
        solution: source.solution || null,
        features: source.features || [],
        challenges: source.challenges || [],
        futureImprovements: source.future_improvements || [],
        techStack: source.tech_stack || source.techStack || [],
        displayDate: source.completion_date || source.displayDate || null,
        order: Number(source.order || 0),
        thumbnailId: source.thumbnail_media_id || source.thumbnailId || null,
        thumbnailUrl: source.thumbnail || source.thumbnail_url || null,
      };
    case 'DesignProject':
      return {
        title: source.title,
        description: source.description,
        category: source.category || null,
        client: source.client || null,
        softwareUsed: source.software_used || [],
        tags: source.tags || [],
        displayDate: source.date || source.displayDate || null,
        order: Number(source.order || 0),
        status: common.status,
        thumbnailId: source.thumbnail_media_id || source.thumbnailId || null,
        thumbnailUrl: source.thumbnail || source.thumbnail_url || null,
      };
    default:
      return common;
  }
}

const localFallbackEntity = (entityName) => ({
  list: async (orderBy, limit = 100) => {
    let list = getEntityStore(entityName);
    if (orderBy) list = sortEntities(list, orderBy);
    return list.slice(0, limit);
  },
  create: async (data) => {
    const list = getEntityStore(entityName);
    const newItem = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      created_date: new Date().toISOString(),
      updated_date: new Date().toISOString(),
    };
    list.push(newItem);
    saveEntityStore(entityName, list);
    return newItem;
  },
  update: async (idOrObj, data) => {
    const id = typeof idOrObj === 'object' && idOrObj !== null ? idOrObj.id : idOrObj;
    const list = getEntityStore(entityName);
    const idx = list.findIndex(item => item.id === id);
    if (idx === -1) throw new Error(`Item with id ${id} not found in ${entityName}`);
    const updatedItem = { ...list[idx], ...data, updated_date: new Date().toISOString() };
    list[idx] = updatedItem;
    saveEntityStore(entityName, list);
    return updatedItem;
  },
  delete: async (id) => {
    let list = getEntityStore(entityName);
    list = list.filter(item => item.id !== id);
    saveEntityStore(entityName, list);
    return { success: true };
  },
});

export const portfolioApi = {
  auth: {
    me: async () => {
      const data = await apiRequest('/auth/me');
      return data.user || data;
    },
    loginViaEmailPassword: async (email, password) => {
      const data = await apiRequest('/auth/login', { method: 'POST', body: { email, password } });
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify({ email, ts: Date.now() }));
      return data;
    },
    loginAdmin: async (email, password, adminAccessCode) => {
      const data = await apiRequest('/auth/admin/login', {
        method: 'POST',
        body: { email, password, adminAccessCode },
      });
      const token = data?.adminAccessToken || data?.accessToken || data?.token || '';
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email, token, ts: Date.now() }));
      return data;
    },
    loginWithProvider: async (provider, redirectUrl) => {
      throw new Error(`${provider} login is not configured for the Node backend yet.`);
    },
    register: async ({ email, password }) => {
      return apiRequest('/auth/register', { method: 'POST', body: { email, password } });
    },
    verifyOtp: async ({ email, otpCode }) => {
      throw new Error('OTP verification is not configured for the Node backend yet.');
    },
    resendOtp: async () => {},
    resetPasswordRequest: async () => {},
    resetPassword: async () => {},
    logout: async () => {
      localStorage.removeItem(USER_SESSION_KEY);
      localStorage.removeItem(ADMIN_SESSION_KEY);
      await apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    },
    redirectToLogin: (url) => { window.location.href = '/login' },
    setToken: (token) => {
      if (token) {
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify({ token, ts: Date.now() }));
      } else {
        localStorage.removeItem(USER_SESSION_KEY);
      }
    },
  },
  entities: new Proxy({}, {
    get: (target, entityName) => ({
      list: async (orderBy, limit = 100) => {
        const route = entityRoutes[entityName];
        if (!route) return localFallbackEntity(entityName).list(orderBy, limit);
        const useAdmin = isAdminSessionActive();
        const endpoint = useAdmin ? route.admin : route.public;
        const sort = backendSort(orderBy);
        try {
          const data = await apiRequest(`/${endpoint}?limit=${limit}&sort=${encodeURIComponent(sort)}`);
          return normalizeList(entityName, data);
        } catch (error) {
          if (useAdmin || remoteOnlyEntities.has(entityName)) throw error;
          return localFallbackEntity(entityName).list(orderBy, limit);
        }
      },
      create: async (data) => {
        if (entityName === 'ContactMessage') {
          const payload = {
            name: data.name,
            email: data.email,
            company: data.company || null,
            reason: data.reason || null,
            message: data.message,
          };
          return await apiRequest('/contact', { method: 'POST', body: payload });
        }
        const route = entityRoutes[entityName];
        if (!route || !isAdminSessionActive()) {
          if (remoteOnlyEntities.has(entityName)) throw new Error('Admin session required to create projects');
          return localFallbackEntity(entityName).create(data);
        }
        const created = await apiRequest(`/${route.admin}`, { method: 'POST', body: toApiPayload(entityName, data) });
        return normalizeItem(entityName, created);
      },
      update: async (idOrObj, data) => {
        const id = typeof idOrObj === 'object' && idOrObj !== null ? idOrObj.id : idOrObj;
        const route = entityRoutes[entityName];
        if (!route || !isAdminSessionActive()) {
          if (remoteOnlyEntities.has(entityName)) throw new Error('Admin session required to update projects');
          return localFallbackEntity(entityName).update(id, data);
        }
        const updated = await apiRequest(`/${route.admin}/${id}`, { method: 'PATCH', body: toApiPayload(entityName, data) });
        return normalizeItem(entityName, updated);
      },
      delete: async (id) => {
        const route = entityRoutes[entityName];
        if (!route || !isAdminSessionActive()) {
          if (remoteOnlyEntities.has(entityName)) throw new Error('Admin session required to delete projects');
          return localFallbackEntity(entityName).delete(id);
        }
        return apiRequest(`/${route.admin}/${id}`, { method: 'DELETE' });
      },
    }),
  }),
  settings: {
    get: async () => apiRequest('/settings'),
    update: async (data) => apiRequest('/admin/settings', { method: 'PATCH', body: data }),
  },
  integrations: {
    Core: {
      UploadFile: async ({ file, folder = 'portfolio/gallery', resourceType = 'auto' }) => {
        if (!file) return { file_url: '', media_id: null };
        const signature = await apiRequest('/media/signature', {
          method: 'POST',
          body: { folder, resourceType },
        });
        const uploadBody = new FormData();
        uploadBody.append('file', file);
        uploadBody.append('api_key', signature.apiKey);
        uploadBody.append('timestamp', String(signature.timestamp));
        uploadBody.append('folder', signature.folder);
        uploadBody.append('signature', signature.signature);

        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signature.cloudName}/${resourceType}/upload`,
          { method: 'POST', body: uploadBody }
        );
        const uploaded = await uploadResponse.json().catch(() => null);
        if (!uploadResponse.ok) {
          throw new Error(uploaded?.error?.message || 'File upload failed');
        }

        const resourceMap = { image: 'IMAGE', video: 'VIDEO', raw: 'RAW' };
        const media = await apiRequest('/media', {
          method: 'POST',
          body: {
            cloudinaryId: uploaded.public_id,
            url: uploaded.url,
            secureUrl: uploaded.secure_url,
            resourceType: resourceMap[uploaded.resource_type] || 'AUTO',
            format: uploaded.format || null,
            mimeType: file.type || null,
            width: uploaded.width || null,
            height: uploaded.height || null,
            bytes: uploaded.bytes || null,
            duration: uploaded.duration || null,
            folder,
          },
        });
        return { file_url: uploaded.secure_url, media_id: media.id };
      },
    },
    steam: {
      getProfile: async () => apiRequest('/steam'),
    },
  },
};
