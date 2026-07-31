export const collectionsData = [
  { id: '01', key: 'brands', label: 'BRANDS', count: 85 },
  { id: '02', key: 'clients', label: 'CLIENTS', count: 48 },
  { id: '03', key: 'socials', label: 'SOCIALS', count: 34 },
  { id: '04', key: 'products', label: 'PRODUCTS', count: 29 },
  { id: '05', key: 'events', label: 'EVENTS', count: 18 },
];

export const brandsData = [
  // ==========================================
  // SECTION 01: BRANDS
  // ==========================================
  {
    id: '01',
    slug: 'mejwani-masale',
    name: 'MEJWANI MASALE',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 18,
    designCount: 42,
    duration: '2024 – 2026',
    collectionId: '01',
    isHot: true,
    stats: {
      projects: 18,
      designs: '42+',
      duration: '2024 – 2026',
      categories: ['PACKAGING', 'SOCIAL MEDIA', 'BRANDING', 'CAMPAIGNS'],
    },
    overview: 'Mejwani Masale is a heritage spice manufacturer delivering authentic Maharashtrian spice blends. We created an end-to-end visual redesign spanning pouch packaging, social media marketing campaigns, point-of-sale display materials, and digital advertising.',
    role: 'Lead Graphic & Packaging Designer',
    scope: ['Packaging Design', 'Social Media Marketing', 'Ad Campaigns', 'Brand Visual Identity', '3D Packaging Mockups'],
    colorPalette: ['#84cc16', '#dc2626', '#f59e0b', '#0f0f0f', '#f9f8f6'],
    typography: ['Playfair Display', 'Plus Jakarta Sans', 'Caveat'],
    allWorks: [
      {
        id: 'mejwani-01',
        number: '01',
        title: 'Chicken Masala Red Series Pouch',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1400&auto=format&fit=crop&q=80',
        description: 'Matte foil finish pouch with custom dish photography and gold foil emblem.'
      },
      {
        id: 'mejwani-02',
        number: '02',
        title: 'Veg Biryani Masala Green Series',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1400&auto=format&fit=crop&q=80',
        description: 'Deep emerald packaging highlighting fresh organic spice ingredients.'
      },
      {
        id: 'mejwani-03',
        number: '03',
        title: 'Paneer Masala Gold Series Pouch',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1400&auto=format&fit=crop&q=80',
        description: 'Warm amber tones designed for maximum retail shelf prominence.'
      },
      {
        id: 'mejwani-04',
        number: '04',
        title: 'Har Bite Me Maa Ka Pyaar Campaign',
        category: 'SOCIAL MEDIA',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=1400&auto=format&fit=crop&q=80',
        description: 'Social poster creative celebrating home cooking heritage.'
      },
      {
        id: 'mejwani-05',
        number: '05',
        title: 'Pyaar Jo Har Masale Mein Milega',
        category: 'SOCIAL MEDIA',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1400&auto=format&fit=crop&q=80',
        description: 'Instagram carousel opener spotlighting rich authentic spice textures.'
      }
    ]
  },
  {
    id: '02',
    slug: 'achl',
    name: 'ACHL GLOBAL',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 12,
    designCount: 30,
    duration: '2025 – 2026',
    collectionId: '01',
    stats: {
      projects: 12,
      designs: '30+',
      duration: '2025 – 2026',
      categories: ['BRAND IDENTITY', 'UI/UX', 'DESIGN SYSTEM', 'WEB'],
    },
    overview: 'ACHL is a global innovation lab and venture builder supporting early-stage technology startups. We crafted a sophisticated, future-ready brand system, digital platform interfaces, investor pitch decks, and brand guidelines.',
    role: 'Lead Identity & Digital UI Designer',
    scope: ['Brand Architecture', 'Figma Design System', 'Venture Studio Platform UI', 'Pitch Decks', 'Design Tokens'],
    colorPalette: ['#6366F1', '#1E293B', '#38BDF8', '#0F172A', '#F8FAFC'],
    typography: ['Plus Jakarta Sans', 'Inter'],
    allWorks: [
      {
        id: 'achl-01',
        number: '01',
        title: 'Brand Identity & Logomark',
        category: 'BRAND IDENTITY',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
        description: 'Core visual identity, geometry specs, and logomark guidelines for ACHL Global.'
      },
      {
        id: 'achl-02',
        number: '02',
        title: 'Investor Dashboard UI Design',
        category: 'UI/UX',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'High-density dark mode analytics dashboard interface for venture capital tracking.'
      },
      {
        id: 'achl-03',
        number: '03',
        title: 'Venture Studio Landing Page',
        category: 'WEB',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1400&auto=format&fit=crop&q=80',
        description: 'Responsive desktop landing page featuring glassmorphism elements and smooth dark layout.'
      },
      {
        id: 'achl-04',
        number: '04',
        title: 'Mobile Pitch Deck App UI',
        category: 'UI/UX',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&auto=format&fit=crop&q=80',
        description: 'Interactive founder pitch presentation application on mobile screens.'
      }
    ]
  },
  {
    id: '03',
    slug: 'verve-studio',
    name: 'VERVE STUDIO',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 6,
    designCount: 18,
    duration: '2025 – 2026',
    collectionId: '01',
    stats: {
      projects: 6,
      designs: '18+',
      duration: '2025 – 2026',
      categories: ['EDITORIAL', 'PRINT DESIGN', 'TYPOGRAPHY', 'MONOGRAPH'],
    },
    overview: 'Verve Studio is a boutique architectural publication house. We created a limited-edition monograph series, tactile print covers with gold leaf embossing, and bespoke serif typography systems.',
    role: 'Editorial Director & Book Designer',
    scope: ['Print Monograph Design', 'Foil Stamping Specs', 'Typography Curation', 'Editorial Layout'],
    colorPalette: ['#171717', '#D97706', '#E5E5E5', '#262626'],
    typography: ['Playfair Display', 'Georgia'],
    allWorks: [
      {
        id: 'verve-01',
        number: '01',
        title: 'Issue 04 Architectural Cover',
        category: 'EDITORIAL',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1400&auto=format&fit=crop&q=80',
        description: 'Matte black cover featuring gold leaf debossing.'
      },
      {
        id: 'verve-02',
        number: '02',
        title: 'Typography & Grid Monograph',
        category: 'TYPOGRAPHY',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1400&auto=format&fit=crop&q=80',
        description: 'In-depth editorial study on classical grid proportions.'
      },
      {
        id: 'verve-03',
        number: '03',
        title: 'Architectural Photography Book',
        category: 'PRINT DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist interior layout showcasing concrete structures.'
      },
      {
        id: 'verve-04',
        number: '04',
        title: 'Exhibition Invitation Cards',
        category: 'EDITORIAL',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&auto=format&fit=crop&q=80',
        description: 'Textured cotton paper cards with metallic ink foil.'
      }
    ]
  },
  {
    id: '04',
    slug: 'zenith-apparel',
    name: 'ZENITH APPAREL',
    type: 'Brand Identity',
    year: '2027',
    worksCount: 14,
    designCount: 36,
    duration: '2025 – 2027',
    collectionId: '01',
    stats: {
      projects: 14,
      designs: '36+',
      duration: '2025 – 2027',
      categories: ['BRANDING', 'PACKAGING', 'APPAREL', 'LOOKBOOK'],
    },
    overview: 'Zenith Apparel is an eco-conscious outdoor performance wear brand. We created sustainable woven garment labels, recyclable shipping boxes, and seasonal lookbook art direction.',
    role: 'Creative Director & Brand Strategist',
    scope: ['Apparel Branding', 'Hangtags & Labels', 'Packaging Boxes', 'Lookbook Photography Direction'],
    colorPalette: ['#10B981', '#1C1917', '#78716C', '#F5F5F4'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'zenith-01',
        number: '01',
        title: 'Outdoor Collection Lookbook',
        category: 'LOOKBOOK',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&auto=format&fit=crop&q=80',
        description: 'Spring/Summer outdoor collection hero photography.'
      },
      {
        id: 'zenith-02',
        number: '02',
        title: 'Minimal Woven Garment Labels',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&auto=format&fit=crop&q=80',
        description: 'Eco-conscious woven tags and apparel branding.'
      },
      {
        id: 'zenith-03',
        number: '03',
        title: 'Recyclable Shipping Box Design',
        category: 'PACKAGING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1400&auto=format&fit=crop&q=80',
        description: 'Kraft paper eco packaging box with water-based soy ink.'
      },
      {
        id: 'zenith-04',
        number: '04',
        title: 'Performance Wear Store Display',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&auto=format&fit=crop&q=80',
        description: 'Flagship retail store interior visual identity.'
      }
    ]
  },
  {
    id: '05',
    slug: 'kaleido-creative',
    name: 'KALEIDO CREATIVE',
    type: 'Brand Identity',
    year: '2027',
    worksCount: 11,
    designCount: 28,
    duration: '2026 – 2027',
    collectionId: '01',
    stats: {
      projects: 11,
      designs: '28+',
      duration: '2026 – 2027',
      categories: ['ILLUSTRATIONS', 'POSTERS', 'MERCH', '3D ART'],
    },
    overview: 'Kaleido Creative is an experimental illustration collective exploring 3D character design, vector art prints, and limited-edition merchandise.',
    role: 'Art Director & Illustrator',
    scope: ['3D Character Art', 'Silkscreen Posters', 'Vinyl Stickers', 'Merch Design'],
    colorPalette: ['#EC4899', '#8B5CF6', '#F43F5E', '#0F172A'],
    typography: ['Playfair Display', 'Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'kaleido-01',
        number: '01',
        title: '3D Character Art Exhibit',
        category: 'ILLUSTRATIONS',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1400&auto=format&fit=crop&q=80',
        description: 'Vibrant surreal 3D vector illustration.'
      },
      {
        id: 'kaleido-02',
        number: '02',
        title: 'Neon Cyberpunk Poster Series',
        category: 'POSTERS',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1400&auto=format&fit=crop&q=80',
        description: 'High-contrast glowing vector typography poster.'
      },
      {
        id: 'kaleido-03',
        number: '03',
        title: 'Limited Edition Vinyl Sticker Pack',
        category: 'MERCH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1400&auto=format&fit=crop&q=80',
        description: 'Holographic die-cut stickers for street art culture.'
      },
      {
        id: 'kaleido-04',
        number: '04',
        title: 'Abstract Surreal Canvas Print',
        category: '3D ART',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
        description: 'Fluid 3D gradient sculpture rendered for gallery wall.'
      }
    ]
  },
  {
    id: '06',
    slug: 'nova-dynamics',
    name: 'NOVA DYNAMICS',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 8,
    designCount: 22,
    duration: '2025 – 2026',
    collectionId: '01',
    stats: {
      projects: 8,
      designs: '22+',
      duration: '2025 – 2026',
      categories: ['BRANDING', 'IDENTITY', 'SYSTEMS'],
    },
    overview: 'Nova Dynamics is an aerospace research initiative. We built a futuristic corporate visual system, logo mark, stationery suite, and vehicle livery.',
    role: 'Lead Visual Designer',
    scope: ['Brand Mark', 'Stationery Design', 'Vehicle Livery', 'Brand Guide'],
    colorPalette: ['#0284C7', '#0F172A', '#38BDF8', '#F8FAFC'],
    typography: ['Outfit', 'Inter'],
    allWorks: [
      {
        id: 'nova-01',
        number: '01',
        title: 'Aerospace Brand System',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1400&auto=format&fit=crop&q=80',
        description: 'Next-gen aerospace corporate identity and symbol design.'
      },
      {
        id: 'nova-02',
        number: '02',
        title: 'Rocket Payload Livery Graphics',
        category: 'IDENTITY',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=1400&auto=format&fit=crop&q=80',
        description: 'High-visibility corporate graphics for launch vehicles.'
      },
      {
        id: 'nova-03',
        number: '03',
        title: 'Executive Stationery & Cards',
        category: 'SYSTEMS',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1400&auto=format&fit=crop&q=80',
        description: 'Silver foil stamped corporate letterhead and business cards.'
      },
      {
        id: 'nova-04',
        number: '04',
        title: 'Space Research Facility Wayfinding',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80',
        description: 'Illuminated glass signage for aerospace headquarters.'
      }
    ]
  },
  {
    id: '07',
    slug: 'pulse-energy',
    name: 'PULSE ENERGY',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 15,
    designCount: 34,
    duration: '2024 – 2026',
    collectionId: '01',
    stats: {
      projects: 15,
      designs: '34+',
      duration: '2024 – 2026',
      categories: ['RENEWABLES', 'IDENTITY', 'CAMPAIGNS'],
    },
    overview: 'Pulse Energy provides clean solar power storage. We designed clean green branding, fleet wraps, and customer portal collateral.',
    role: 'Brand Designer',
    scope: ['Identity Design', 'Fleet Graphics', 'Collateral'],
    colorPalette: ['#10B981', '#064E3B', '#A7F3D0', '#111827'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'pulse-01',
        number: '01',
        title: 'Solar Grid Identity System',
        category: 'RENEWABLES',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1400&auto=format&fit=crop&q=80',
        description: 'Vibrant clean energy brand collateral and digital banners.'
      },
      {
        id: 'pulse-02',
        number: '02',
        title: 'Service Fleet Vehicle Wrap',
        category: 'IDENTITY',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1558441719-677248003f56?w=1400&auto=format&fit=crop&q=80',
        description: 'High-contrast electric van vinyl livery graphics.'
      },
      {
        id: 'pulse-03',
        number: '03',
        title: 'Customer Solar Energy Portal UI',
        category: 'CAMPAIGNS',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'Real-time kilowatt tracking mobile dashboard screen.'
      },
      {
        id: 'pulse-04',
        number: '04',
        title: 'Clean Future Print Brochure',
        category: 'RENEWABLES',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1542744094-3a3172720189?w=1400&auto=format&fit=crop&q=80',
        description: 'Recycled paper corporate sustainability report.'
      }
    ]
  },
  {
    id: '08',
    slug: 'horizon-craft',
    name: 'HORIZON CRAFT',
    type: 'Brand Identity',
    year: '2026',
    worksCount: 10,
    designCount: 26,
    duration: '2025 – 2026',
    collectionId: '01',
    stats: {
      projects: 10,
      designs: '26+',
      duration: '2025 – 2026',
      categories: ['PACKAGING', 'LABEL DESIGN', 'CRAFT'],
    },
    overview: 'Horizon Craft is an artisanal brewery. We crafted bespoke glass bottle labels, embossed coasters, and wooden gift packaging boxes.',
    role: 'Packaging Art Director',
    scope: ['Bottle Labels', 'Embossed Coasters', 'Gift Boxes'],
    colorPalette: ['#D97706', '#78350F', '#FEF3C7', '#1F2937'],
    typography: ['Playfair Display', 'Cinzel'],
    allWorks: [
      {
        id: 'horizon-01',
        number: '01',
        title: 'Artisanal Craft Ale Bottles',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=1400&auto=format&fit=crop&q=80',
        description: 'Custom textured paper labels with gold foil accents.'
      },
      {
        id: 'horizon-02',
        number: '02',
        title: 'Embossed Leather Bar Coasters',
        category: 'CRAFT',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1400&auto=format&fit=crop&q=80',
        description: 'Tactile stamped leather coasters for craft taproom.'
      },
      {
        id: 'horizon-03',
        number: '03',
        title: 'Wooden Collector Gift Crate',
        category: 'PACKAGING',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=1400&auto=format&fit=crop&q=80',
        description: 'Fire-branded wooden crate box for 4-pack reserve ale.'
      },
      {
        id: 'horizon-04',
        number: '04',
        title: 'Taproom Menu & Board Design',
        category: 'LABEL DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&fit=crop&q=80',
        description: 'Chalkboard vector typography menu for craft brewery.'
      }
    ]
  },
  {
    id: '09',
    slug: 'aura-cosmetics',
    name: 'AURA COSMETICS',
    type: 'Brand Identity',
    year: '2027',
    worksCount: 9,
    designCount: 24,
    duration: '2026 – 2027',
    collectionId: '01',
    stats: {
      projects: 9,
      designs: '24+',
      duration: '2026 – 2027',
      categories: ['BEAUTY', 'PACKAGING', 'BRANDING'],
    },
    overview: 'Aura Cosmetics is a luxury skincare brand. We designed minimalist frosted glass skincare bottles and botanical packaging cartons.',
    role: 'Package & Visual Designer',
    scope: ['Container Design', 'Botanical Graphics', 'Carton Packaging'],
    colorPalette: ['#F472B6', '#831843', '#FDF2F8', '#18181B'],
    typography: ['Cormorant Garamond', 'Inter'],
    allWorks: [
      {
        id: 'aura-01',
        number: '01',
        title: 'Luxury Serum Bottle Packaging',
        category: 'PACKAGING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1608248597349-492322a3a577?w=1400&auto=format&fit=crop&q=80',
        description: 'Frosted glass dropper bottles with minimalist typography.'
      },
      {
        id: 'aura-02',
        number: '02',
        title: 'Botanical Ingredient Carton Box',
        category: 'BEAUTY',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&auto=format&fit=crop&q=80',
        description: 'Soft pastel pink paper box with floral line illustration.'
      },
      {
        id: 'aura-03',
        number: '03',
        title: 'Hydrating Face Cream Jar',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=80',
        description: 'Heavy frosted glass cosmetics jar with rose gold cap.'
      },
      {
        id: 'aura-04',
        number: '04',
        title: 'Boutique Store Front Display',
        category: 'BRANDING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1400&auto=format&fit=crop&q=80',
        description: 'Luxury retail counter display stand with acrylic podiums.'
      }
    ]
  },
  {
    id: '10',
    slug: 'velocity-motors',
    name: 'VELOCITY MOTORS',
    type: 'Brand Identity',
    year: '2027',
    worksCount: 13,
    designCount: 38,
    duration: '2025 – 2027',
    collectionId: '01',
    stats: {
      projects: 13,
      designs: '38+',
      duration: '2025 – 2027',
      categories: ['AUTOMOTIVE', 'BRANDING', 'EXHIBIT'],
    },
    overview: 'Velocity Motors is an EV sports car startup. We delivered car showroom visual graphics, key fob design, and launch event branding.',
    role: 'Lead Automotive Brand Designer',
    scope: ['Showroom Graphics', 'Key Fob Design', 'Event Stage Assets'],
    colorPalette: ['#EF4444', '#7F1D1D', '#0F172A', '#FFFFFF'],
    typography: ['Outfit', 'Space Grotesk'],
    allWorks: [
      {
        id: 'velocity-01',
        number: '01',
        title: 'EV Hypercar Concept Branding',
        category: 'AUTOMOTIVE',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&auto=format&fit=crop&q=80',
        description: 'High-contrast red and carbon fiber automotive brand suite.'
      },
      {
        id: 'velocity-02',
        number: '02',
        title: 'Carbon Fiber Smart Key Fob',
        category: 'BRANDING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1400&auto=format&fit=crop&q=80',
        description: 'Machined aluminum and real carbon fiber car key accessory.'
      },
      {
        id: 'velocity-03',
        number: '03',
        title: 'Showroom Interior Wall Graphics',
        category: 'EXHIBIT',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1400&auto=format&fit=crop&q=80',
        description: 'Large-scale LED light wall visuals for EV dealership.'
      },
      {
        id: 'velocity-04',
        number: '04',
        title: 'Launch Event Stage Backdrop',
        category: 'AUTOMOTIVE',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&auto=format&fit=crop&q=80',
        description: 'Dramatic lighting stage design for vehicle reveal.'
      }
    ]
  },

  // ==========================================
  // SECTION 02: CLIENTS
  // ==========================================
  {
    id: '01',
    slug: 'lumina-digital',
    name: 'LUMINA DIGITAL',
    type: 'Client Work',
    year: '2027',
    worksCount: 9,
    designCount: 25,
    duration: '2026 – 2027',
    collectionId: '02',
    stats: {
      projects: 9,
      designs: '25+',
      duration: '2026 – 2027',
      categories: ['APP DESIGN', 'UI/UX', 'MOBILE SUITE', 'FINTECH'],
    },
    overview: 'Lumina Digital is a next-generation fintech application facilitating cross-border microtransactions and smart digital asset storage.',
    role: 'Lead Product Designer',
    scope: ['Mobile App Architecture', 'Fintech UI Suite', 'Micro-Interactions', 'Dark Mode UI'],
    colorPalette: ['#A855F7', '#4F46E5', '#0F172A', '#FFFFFF'],
    typography: ['Plus Jakarta Sans', 'Inter'],
    allWorks: [
      {
        id: 'lumina-01',
        number: '01',
        title: 'Lumina Banking Dashboard',
        category: 'APP DESIGN',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&auto=format&fit=crop&q=80',
        description: 'Main account balance and transaction screen for mobile banking.'
      },
      {
        id: 'lumina-02',
        number: '02',
        title: 'Crypto Wallet Interface',
        category: 'UI/UX',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&auto=format&fit=crop&q=80',
        description: 'Dark mode crypto asset storage interface.'
      },
      {
        id: 'lumina-03',
        number: '03',
        title: 'Instant Send Micro-Interaction',
        category: 'MOBILE SUITE',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
        description: 'Haptic feedback payment success screen animation.'
      },
      {
        id: 'lumina-04',
        number: '04',
        title: 'Virtual Credit Card Management',
        category: 'FINTECH',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1556742049-0a67568d0d9f?w=1400&auto=format&fit=crop&q=80',
        description: 'Custom gradient virtual debit cards with instant lock controls.'
      }
    ]
  },
  {
    id: '02',
    slug: 'nexus-tech',
    name: 'NEXUS TECH',
    type: 'Client Work',
    year: '2027',
    worksCount: 7,
    designCount: 20,
    duration: '2026 – 2027',
    collectionId: '02',
    stats: {
      projects: 7,
      designs: '20+',
      duration: '2026 – 2027',
      categories: ['BRAND IDENTITY', 'WEB', 'PITCH DECKS', '3D ASSETS'],
    },
    overview: 'Nexus Tech is an autonomous cloud AI infrastructure company. We created high-impact 3D key visuals, investor pitch decks, and brand identity systems.',
    role: 'Lead 3D & Identity Designer',
    scope: ['3D Artwork', 'Pitch Decks', 'Web Visuals', 'Brand Guidelines'],
    colorPalette: ['#06B6D4', '#0F172A', '#3B82F6', '#F8FAFC'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'nexus-01',
        number: '01',
        title: 'Nexus Autonomous AI Brand System',
        category: 'BRAND IDENTITY',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80',
        description: 'Sleek futuristic identity for cloud AI infrastructure.'
      },
      {
        id: 'nexus-02',
        number: '02',
        title: 'Abstract 3D Key Visuals',
        category: '3D ASSETS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
        description: 'High-resolution 3D renders for web and pitch materials.'
      },
      {
        id: 'nexus-03',
        number: '03',
        title: 'Series B Investor Pitch Deck',
        category: 'PITCH DECKS',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&auto=format&fit=crop&q=80',
        description: '24-slide keynote presentation deck with custom infographics.'
      },
      {
        id: 'nexus-04',
        number: '04',
        title: 'Cloud Node Status Web Portal',
        category: 'WEB',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&auto=format&fit=crop&q=80',
        description: 'Dark glassmorphism server monitoring interface.'
      }
    ]
  },
  {
    id: '03',
    slug: 'apex-healthcare',
    name: 'APEX HEALTHCARE',
    type: 'Client Work',
    year: '2026',
    worksCount: 11,
    designCount: 29,
    duration: '2025 – 2026',
    collectionId: '02',
    stats: {
      projects: 11,
      designs: '29+',
      duration: '2025 – 2026',
      categories: ['TELEHEALTH', 'UI/UX', 'PATIENT PORTAL'],
    },
    overview: 'Apex Healthcare needed a complete digital makeover for their patient consultation portal and mobile appointment app.',
    role: 'Senior Product Designer',
    scope: ['Patient Portal', 'Doctor Dashboard', 'Appointment Booking', 'Design System'],
    colorPalette: ['#0D9488', '#134E4A', '#CCFBF1', '#0F172A'],
    typography: ['Inter', 'Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'apex-01',
        number: '01',
        title: 'Patient Telehealth Portal UI',
        category: 'TELEHEALTH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop&q=80',
        description: 'Clean medical dashboard for scheduling and virtual doctor calls.'
      },
      {
        id: 'apex-02',
        number: '02',
        title: 'Doctor Schedule & EHR Interface',
        category: 'UI/UX',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1400&auto=format&fit=crop&q=80',
        description: 'Physician portal for reviewing patient records and lab results.'
      },
      {
        id: 'apex-03',
        number: '03',
        title: 'Digital Prescription Mobile App',
        category: 'PATIENT PORTAL',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1400&auto=format&fit=crop&q=80',
        description: 'Mobile app screen for prescription refills and dosage reminders.'
      },
      {
        id: 'apex-04',
        number: '04',
        title: 'Vital Metrics Analytics Graphs',
        category: 'TELEHEALTH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&auto=format&fit=crop&q=80',
        description: 'Real-time biometric data visualizations for remote patient care.'
      }
    ]
  },
  {
    id: '04',
    slug: 'prism-software',
    name: 'PRISM SOFTWARE',
    type: 'Client Work',
    year: '2026',
    worksCount: 14,
    designCount: 35,
    duration: '2024 – 2026',
    collectionId: '02',
    stats: {
      projects: 14,
      designs: '35+',
      duration: '2024 – 2026',
      categories: ['DEVTOOLS', 'WEB', 'UI DESIGN'],
    },
    overview: 'Prism Software is a developer tools startup. We crafted their developer docs site, IDE theme plugin, and marketing landing page.',
    role: 'UI/UX Lead',
    scope: ['Documentation Site', 'IDE Dark Theme', 'Marketing Website'],
    colorPalette: ['#8B5CF6', '#4C1D95', '#DDD6FE', '#09090B'],
    typography: ['Fira Code', 'Inter'],
    allWorks: [
      {
        id: 'prism-01',
        number: '01',
        title: 'Developer Platform Documentation',
        category: 'DEVTOOLS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop&q=80',
        description: 'High-speed markdown documentation interface with live code blocks.'
      },
      {
        id: 'prism-02',
        number: '02',
        title: 'IDE Dark Code Editor Theme',
        category: 'UI DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1400&auto=format&fit=crop&q=80',
        description: 'Custom syntax highlighting palette for VS Code and JetBrains.'
      },
      {
        id: 'prism-03',
        number: '03',
        title: 'Terminal CLI Output Interface',
        category: 'DEVTOOLS',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1400&auto=format&fit=crop&q=80',
        description: 'Color-coded terminal logs and build pipeline output layout.'
      },
      {
        id: 'prism-04',
        number: '04',
        title: 'DevTools Marketing Website',
        category: 'WEB',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'High-converting landing page with interactive terminal demo.'
      }
    ]
  },
  {
    id: '05',
    slug: 'vanguard-capital',
    name: 'VANGUARD CAPITAL',
    type: 'Client Work',
    year: '2027',
    worksCount: 8,
    designCount: 19,
    duration: '2026 – 2027',
    collectionId: '02',
    stats: {
      projects: 8,
      designs: '19+',
      duration: '2026 – 2027',
      categories: ['FINANCE', 'BRANDING', 'PITCH DECKS'],
    },
    overview: 'Vanguard Capital is an institutional investment fund. We delivered high-end investor pitch decks, annual report layouts, and brand assets.',
    role: 'Lead Editorial & Deck Designer',
    scope: ['Annual Reports', 'Pitch Decks', 'Executive Summaries'],
    colorPalette: ['#1E3A8A', '#172554', '#DBEAFE', '#020617'],
    typography: ['Merriweather', 'Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'vanguard-01',
        number: '01',
        title: '2026 Institutional Investment Report',
        category: 'FINANCE',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&auto=format&fit=crop&q=80',
        description: 'Premium print and PDF annual report layout with custom charts.'
      },
      {
        id: 'vanguard-02',
        number: '02',
        title: 'Fund II Pitch Deck Presentation',
        category: 'PITCH DECKS',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&auto=format&fit=crop&q=80',
        description: 'Clean financial deck for institutional LP fundraising.'
      },
      {
        id: 'vanguard-03',
        number: '03',
        title: 'Portfolio Performance Dashboard',
        category: 'FINANCE',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'High-density web dashboard for tracking equity yields.'
      },
      {
        id: 'vanguard-04',
        number: '04',
        title: 'Corporate Stationery & Seal',
        category: 'BRANDING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1400&auto=format&fit=crop&q=80',
        description: 'Gold embossed stationery and navy leather binder suite.'
      }
    ]
  },
  {
    id: '06',
    slug: 'solaris-energy',
    name: 'SOLARIS ENERGY',
    type: 'Client Work',
    year: '2026',
    worksCount: 10,
    designCount: 27,
    duration: '2025 – 2026',
    collectionId: '02',
    stats: {
      projects: 10,
      designs: '27+',
      duration: '2025 – 2026',
      categories: ['CLEANTECH', 'WEB', 'UI/UX'],
    },
    overview: 'Solaris Energy builds residential solar control apps. We designed the consumer mobile app and smart thermostat integration screens.',
    role: 'Product Designer',
    scope: ['Mobile App UI', 'IoT Interface', 'Smart Home Widgets'],
    colorPalette: ['#F59E0B', '#78350F', '#FEF3C7', '#0F172A'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'solaris-01',
        number: '01',
        title: 'Home Solar Monitoring App',
        category: 'CLEANTECH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1400&auto=format&fit=crop&q=80',
        description: 'Real-time solar panel energy generation mobile dashboard.'
      },
      {
        id: 'solaris-02',
        number: '02',
        title: 'Smart Home Battery Dial Widget',
        category: 'UI/UX',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1558441719-677248003f56?w=1400&auto=format&fit=crop&q=80',
        description: 'Circular battery capacity dial interface for smart home wall tablet.'
      },
      {
        id: 'solaris-03',
        number: '03',
        title: 'Solar Array Grid Command UI',
        category: 'WEB',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1400&auto=format&fit=crop&q=80',
        description: 'Desktop monitoring platform for commercial solar farms.'
      },
      {
        id: 'solaris-04',
        number: '04',
        title: 'Consumer Energy Savings App',
        category: 'CLEANTECH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&auto=format&fit=crop&q=80',
        description: 'Mobile onboarding flow demonstrating monthly utility bill savings.'
      }
    ]
  },

  // ==========================================
  // SECTION 03: SOCIALS
  // ==========================================
  {
    id: '01',
    slug: 'viral-reels-system',
    name: 'VIRAL REELS SYSTEM',
    type: 'Social Media',
    year: '2026',
    worksCount: 20,
    designCount: 50,
    duration: '2025 – 2026',
    collectionId: '03',
    stats: {
      projects: 20,
      designs: '50+',
      duration: '2025 – 2026',
      categories: ['REELS', 'MOTION GRAPHICS', 'SHORT-FORM'],
    },
    overview: 'A high-converting video template and motion graphic design system engineered specifically for Instagram Reels, TikTok, and YouTube Shorts.',
    role: 'Motion & Social Designer',
    scope: ['Reels Covers', 'Animated Captions', 'Hook Graphics', 'Transition Effects'],
    colorPalette: ['#E11D48', '#881337', '#FFE4E6', '#09090B'],
    typography: ['Impact', 'Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'social-01',
        number: '01',
        title: 'High-Retention Reels Hook Covers',
        category: 'REELS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1400&auto=format&fit=crop&q=80',
        description: 'Bold typography cover frames designed to maximize video click-throughs.'
      },
      {
        id: 'social-02',
        number: '02',
        title: 'Kinetic Subtitle Typography Pack',
        category: 'MOTION GRAPHICS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80',
        description: 'Fast-paced pop animated caption styles for short-form video.'
      },
      {
        id: 'social-03',
        number: '03',
        title: 'Sound-Reactive Wave Transitions',
        category: 'SHORT-FORM',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80',
        description: 'Neon waveform wipe transitions synced to viral audio tracks.'
      },
      {
        id: 'social-04',
        number: '04',
        title: 'TikTok & Shorts Video Template Suite',
        category: 'REELS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1400&auto=format&fit=crop&q=80',
        description: '9:16 layout templates with customizable lower thirds and call-to-actions.'
      }
    ]
  },
  {
    id: '02',
    slug: 'festivity-carousel',
    name: 'FESTIVITY CAROUSEL',
    type: 'Social Media',
    year: '2026',
    worksCount: 15,
    designCount: 40,
    duration: '2025 – 2026',
    collectionId: '03',
    stats: {
      projects: 15,
      designs: '40+',
      duration: '2025 – 2026',
      categories: ['CAROUSELS', 'INSTAGRAM', 'CAMPAIGN'],
    },
    overview: 'Multi-slide educational and promotional Instagram carousels designed with seamless side-to-side graphic transitions.',
    role: 'Social Media Art Director',
    scope: ['Carousel Layouts', 'Slide Transitions', 'Infographic Design'],
    colorPalette: ['#84CC16', '#365314', '#ECFCCB', '#0F172A'],
    typography: ['Playfair Display', 'Inter'],
    allWorks: [
      {
        id: 'fest-01',
        number: '01',
        title: '10-Slide Seamless Carousel Design',
        category: 'CAROUSELS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&auto=format&fit=crop&q=80',
        description: 'Continuous graphic story slides crafted for maximum user swipe retention.'
      },
      {
        id: 'fest-02',
        number: '02',
        title: 'Educational Swipe Guide Layout',
        category: 'INSTAGRAM',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1542744094-3a3172720189?w=1400&auto=format&fit=crop&q=80',
        description: 'Clean infographic slide deck explaining complex industry tips.'
      },
      {
        id: 'fest-03',
        number: '03',
        title: 'Product Feature Comparison Slides',
        category: 'CAMPAIGN',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'Side-by-side visual comparison carousels for e-commerce brands.'
      },
      {
        id: 'fest-04',
        number: '04',
        title: 'Festive Holiday Sale Swipe Story',
        category: 'CAROUSELS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1400&auto=format&fit=crop&q=80',
        description: 'Vibrant gold and red promotional carousel slides for seasonal events.'
      }
    ]
  },
  {
    id: '03',
    slug: 'creator-story-kits',
    name: 'CREATOR STORY KITS',
    type: 'Social Media',
    year: '2027',
    worksCount: 12,
    designCount: 30,
    duration: '2026 – 2027',
    collectionId: '03',
    stats: {
      projects: 12,
      designs: '30+',
      duration: '2026 – 2027',
      categories: ['STORIES', 'INSTAGRAM', 'TEMPLATES'],
    },
    overview: 'Custom animated Instagram Story frames, Q&A interactive stickers, and product showcase overlays for digital content creators.',
    role: 'Visual Designer',
    scope: ['Story Templates', 'Sticker Packs', 'Interactive Poll Overlays'],
    colorPalette: ['#EC4899', '#831843', '#FCE7F3', '#18181B'],
    typography: ['Plus Jakarta Sans', 'Caveat'],
    allWorks: [
      {
        id: 'story-01',
        number: '01',
        title: 'Animated Creator Story Overlays',
        category: 'STORIES',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&auto=format&fit=crop&q=80',
        description: 'Aesthetic story frames with interactive poll and swipe-up call-to-actions.'
      },
      {
        id: 'story-02',
        number: '02',
        title: 'Interactive Q&A Sticker Pack',
        category: 'INSTAGRAM',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1400&auto=format&fit=crop&q=80',
        description: 'Custom vector sticker designs for Instagram Story engagement.'
      },
      {
        id: 'story-03',
        number: '03',
        title: 'Product Unboxing Story Frame',
        category: 'TEMPLATES',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist video frame layout highlighting e-commerce packaging.'
      },
      {
        id: 'story-04',
        number: '04',
        title: 'Aesthetic Moodboard Story Slide',
        category: 'STORIES',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1400&auto=format&fit=crop&q=80',
        description: 'Collage layout template for lifestyle and fashion creators.'
      }
    ]
  },
  {
    id: '04',
    slug: 'launch-grid-campaign',
    name: 'LAUNCH GRID CAMPAIGN',
    type: 'Social Media',
    year: '2026',
    worksCount: 9,
    designCount: 27,
    duration: '2026',
    collectionId: '03',
    stats: {
      projects: 9,
      designs: '27+',
      duration: '2026',
      categories: ['GRID DESIGN', 'CAMPAIGN', 'BRANDING'],
    },
    overview: 'Synchronized 9-post Instagram grid takeover campaign announcing brand launches and major product reveals.',
    role: 'Grid Architect & Designer',
    scope: ['9-Tile Grid Mapping', 'Social Banners', 'Launch Strategy'],
    colorPalette: ['#6366F1', '#312E81', '#E0E7FF', '#0F172A'],
    typography: ['Outfit', 'Inter'],
    allWorks: [
      {
        id: 'grid-01',
        number: '01',
        title: '9-Tile Instagram Grid Takeover',
        category: 'GRID DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?w=1400&auto=format&fit=crop&q=80',
        description: 'Cohesive multi-post visual puzzle displaying one large hero artwork on profile.'
      },
      {
        id: 'grid-02',
        number: '02',
        title: 'Product Reveal Hero Social Banner',
        category: 'CAMPAIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80',
        description: 'High-impact teaser banner for product launch announcement.'
      },
      {
        id: 'grid-03',
        number: '03',
        title: '3-Day Countdown Story Series',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80',
        description: 'Sequential daily teaser story graphics building release hype.'
      },
      {
        id: 'grid-04',
        number: '04',
        title: 'Launch Event Digital Flyer',
        category: 'GRID DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&auto=format&fit=crop&q=80',
        description: 'Promotional digital flyer graphic for social media distribution.'
      }
    ]
  },
  {
    id: '05',
    slug: 'influencer-kit-suite',
    name: 'INFLUENCER KIT SUITE',
    type: 'Social Media',
    year: '2027',
    worksCount: 11,
    designCount: 28,
    duration: '2026 – 2027',
    collectionId: '03',
    stats: {
      projects: 11,
      designs: '28+',
      duration: '2026 – 2027',
      categories: ['MEDIA KIT', 'SOCIAL', 'BRANDING'],
    },
    overview: 'Digital media kits, rate cards, and sponsor deck designs for top-tier creators and digital influencers.',
    role: 'Editorial & Social Designer',
    scope: ['Media Kits', 'Sponsor Decks', 'Rate Cards'],
    colorPalette: ['#10B981', '#064E3B', '#D1FAE5', '#09090B'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'inf-01',
        number: '01',
        title: 'Creator Media Kit & Rate Card',
        category: 'MEDIA KIT',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1542744094-3a3172720189?w=1400&auto=format&fit=crop&q=80',
        description: 'Polished multi-page press kit displaying audience analytics and campaign rates.'
      },
      {
        id: 'inf-02',
        number: '02',
        title: 'Audience Analytics Slide Deck',
        category: 'SOCIAL',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&auto=format&fit=crop&q=80',
        description: 'Infographic layout highlighting YouTube & Instagram follower growth.'
      },
      {
        id: 'inf-03',
        number: '03',
        title: 'Brand Partnership Pitch Proposal',
        category: 'BRANDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&auto=format&fit=crop&q=80',
        description: 'Custom PDF proposal deck for securing corporate brand sponsorships.'
      },
      {
        id: 'inf-04',
        number: '04',
        title: 'Professional Creator Invoice Template',
        category: 'MEDIA KIT',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1400&auto=format&fit=crop&q=80',
        description: 'Branded invoice document layout for digital deliverables.'
      }
    ]
  },
  {
    id: '06',
    slug: 'trend-motion-assets',
    name: 'TREND MOTION ASSETS',
    type: 'Social Media',
    year: '2026',
    worksCount: 14,
    designCount: 32,
    duration: '2025 – 2026',
    collectionId: '03',
    stats: {
      projects: 14,
      designs: '32+',
      duration: '2025 – 2026',
      categories: ['ANIMATION', 'TIKTOK', 'REELS'],
    },
    overview: 'Trending kinetic typography clips, lower-thirds graphics, and sound-reactive motion graphic templates.',
    role: 'Motion Graphics Designer',
    scope: ['Kinetic Typography', 'Lower Thirds', 'Sound-Reactive FX'],
    colorPalette: ['#F59E0B', '#78350F', '#FEF3C7', '#0F172A'],
    typography: ['Space Grotesk', 'Inter'],
    allWorks: [
      {
        id: 'motion-01',
        number: '01',
        title: 'Kinetic Typography Motion Assets',
        category: 'ANIMATION',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80',
        description: 'Dynamic fast-cut text animations tailored for viral audio clips.'
      },
      {
        id: 'motion-02',
        number: '02',
        title: 'Lower Thirds Broadcast Graphic Pack',
        category: 'TIKTOK',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist title bars and handle callouts for video creators.'
      },
      {
        id: 'motion-03',
        number: '03',
        title: 'Neon Glitch Video Intro Animation',
        category: 'REELS',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1400&auto=format&fit=crop&q=80',
        description: 'High-energy cyberpunk title reveal motion graphics.'
      },
      {
        id: 'motion-04',
        number: '04',
        title: 'Audio Visualizer Spectrum FX',
        category: 'ANIMATION',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1400&auto=format&fit=crop&q=80',
        description: 'Circular sound wave visualization animation for podcasts.'
      }
    ]
  },

  // ==========================================
  // SECTION 04: PRODUCTS
  // ==========================================
  {
    id: '01',
    slug: 'smart-watch-ui',
    name: 'SMART WATCH UI',
    type: 'Product Design',
    year: '2027',
    worksCount: 8,
    designCount: 22,
    duration: '2026 – 2027',
    collectionId: '04',
    stats: {
      projects: 8,
      designs: '22+',
      duration: '2026 – 2027',
      categories: ['WEARABLES', 'UI/UX', 'PRODUCT'],
    },
    overview: 'Circular smart watch interface design featuring health metric watch faces, workout trackers, and quick notification tiles.',
    role: 'Lead Wearables UI Designer',
    scope: ['Watch Faces', 'Fitness Widgets', 'Circular UI Layouts'],
    colorPalette: ['#06B6D4', '#164E63', '#CFFAFE', '#09090B'],
    typography: ['Inter', 'Space Mono'],
    allWorks: [
      {
        id: 'watch-01',
        number: '01',
        title: 'BioMetric Watch Face Design',
        category: 'WEARABLES',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1400&auto=format&fit=crop&q=80',
        description: 'High-contrast OLED screen layout displaying heart rate and calorie rings.'
      },
      {
        id: 'watch-02',
        number: '02',
        title: 'Workout Activity Ring Tracker',
        category: 'UI/UX',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=1400&auto=format&fit=crop&q=80',
        description: 'Circular progress gauge interface for tracking daily fitness metrics.'
      },
      {
        id: 'watch-03',
        number: '03',
        title: 'Sleep Metric & HRV Analytics Dial',
        category: 'PRODUCT',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=1400&auto=format&fit=crop&q=80',
        description: 'Nighttime dark mode screen analyzing recovery score.'
      },
      {
        id: 'watch-04',
        number: '04',
        title: 'Incoming Call & Audio Controller',
        category: 'WEARABLES',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist touch controls for music playback and calls.'
      }
    ]
  },
  {
    id: '02',
    slug: 'eco-bottle-pack',
    name: 'ECO BOTTLE PACK',
    type: 'Product Design',
    year: '2026',
    worksCount: 6,
    designCount: 16,
    duration: '2025 – 2026',
    collectionId: '04',
    stats: {
      projects: 6,
      designs: '16+',
      duration: '2025 – 2026',
      categories: ['PACKAGING', 'INDUSTRIAL', 'SUSTAINABLE'],
    },
    overview: '100% biodegradable stainless steel water bottle product design, laser-engraved logo, and recycled cardboard box.',
    role: 'Industrial & Packaging Designer',
    scope: ['3D Product Rendering', 'Laser Engraving Spec', 'Box Packaging'],
    colorPalette: ['#10B981', '#064E3B', '#D1FAE5', '#111827'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'bottle-01',
        number: '01',
        title: 'Matte Finish Insulated Flask',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist powder-coated insulated water flask product photography.'
      },
      {
        id: 'bottle-02',
        number: '02',
        title: 'Laser-Engraved Stainless Cap Detail',
        category: 'INDUSTRIAL',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1400&auto=format&fit=crop&q=80',
        description: 'Precision etched metallic cap and leak-proof bamboo ring.'
      },
      {
        id: 'bottle-03',
        number: '03',
        title: 'Recycled Cardboard Tube Box',
        category: 'SUSTAINABLE',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1400&auto=format&fit=crop&q=80',
        description: 'Cylindrical kraft paper packaging with minimal black ink.'
      },
      {
        id: 'bottle-04',
        number: '04',
        title: 'Outdoor Hydration Campaign Photography',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1400&auto=format&fit=crop&q=80',
        description: 'Hero lifestyle product render set against mountain landscape.'
      }
    ]
  },
  {
    id: '03',
    slug: 'minimal-keycard',
    name: 'MINIMAL KEYCARD',
    type: 'Product Design',
    year: '2026',
    worksCount: 5,
    designCount: 14,
    duration: '2026',
    collectionId: '04',
    stats: {
      projects: 5,
      designs: '14+',
      duration: '2026',
      categories: ['HARDWARE', 'BRANDING', 'PRINT'],
    },
    overview: 'NFC smart keycard and hotel room key card design system featuring brushed aluminum accents and custom typography.',
    role: 'Product Visual Designer',
    scope: ['NFC Keycard Spec', 'Metal Etching', 'Sleeve Design'],
    colorPalette: ['#171717', '#404040', '#E5E5E5', '#F5F5F5'],
    typography: ['Outfit'],
    allWorks: [
      {
        id: 'card-01',
        number: '01',
        title: 'Brushed Aluminum Smart Keycard',
        category: 'HARDWARE',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&auto=format&fit=crop&q=80',
        description: 'Matte black RFID access keycard with tactile embossed logo.'
      },
      {
        id: 'card-02',
        number: '02',
        title: 'Boutique Hotel Room Pass Sleeve',
        category: 'PRINT',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1400&auto=format&fit=crop&q=80',
        description: 'Heavy cotton paper card sleeve with debossed room number window.'
      },
      {
        id: 'card-03',
        number: '03',
        title: 'Tactile Embossed Logo Metallic Detail',
        category: 'BRANDING',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1400&auto=format&fit=crop&q=80',
        description: 'Micro-etched logo texture on anodized metal surface.'
      },
      {
        id: 'card-04',
        number: '04',
        title: 'Digital Key Mobile Wallet Asset',
        category: 'HARDWARE',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&auto=format&fit=crop&q=80',
        description: 'Apple Wallet and Google Pay virtual pass graphic design.'
      }
    ]
  },
  {
    id: '04',
    slug: 'desk-stand-design',
    name: 'DESK STAND DESIGN',
    type: 'Product Design',
    year: '2027',
    worksCount: 7,
    designCount: 18,
    duration: '2026 – 2027',
    collectionId: '04',
    stats: {
      projects: 7,
      designs: '18+',
      duration: '2026 – 2027',
      categories: ['INDUSTRIAL', '3D MOCKUP', 'ACCESSORY'],
    },
    overview: 'Ergonomic CNC-milled aluminum laptop and tablet desk stand product design and retail packaging box.',
    role: 'Product & 3D Designer',
    scope: ['3D CAD Modeling', 'Retail Box Packaging', 'Render Lighting'],
    colorPalette: ['#64748B', '#1E293B', '#F1F5F9', '#0F172A'],
    typography: ['Inter'],
    allWorks: [
      {
        id: 'stand-01',
        number: '01',
        title: 'CNC Aluminum Laptop Stand',
        category: 'INDUSTRIAL',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1400&auto=format&fit=crop&q=80',
        description: 'Sleek metallic workstation accessory packaging and product shot.'
      },
      {
        id: 'stand-02',
        number: '02',
        title: 'Retail Packaging Box & Unboxing',
        category: '3D MOCKUP',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1400&auto=format&fit=crop&q=80',
        description: 'Premium white cardboard box with foil-stamped product outline.'
      },
      {
        id: 'stand-03',
        number: '03',
        title: 'Precision Angle Adjustment Hinge Spec',
        category: 'ACCESSORY',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&auto=format&fit=crop&q=80',
        description: 'Detailed CAD rendering of dual torque friction hinges.'
      },
      {
        id: 'stand-04',
        number: '04',
        title: 'Workstation Setup Photography',
        category: 'INDUSTRIAL',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist desktop environment render featuring the aluminum stand.'
      }
    ]
  },
  {
    id: '05',
    slug: 'modular-earbuds',
    name: 'MODULAR EARBUDS',
    type: 'Product Design',
    year: '2026',
    worksCount: 9,
    designCount: 25,
    duration: '2025 – 2026',
    collectionId: '04',
    stats: {
      projects: 9,
      designs: '25+',
      duration: '2025 – 2026',
      categories: ['AUDIO', 'PACKAGING', 'PRODUCT'],
    },
    overview: 'Transparent wireless earbuds charging case industrial design and unboxing box experience.',
    role: 'Lead Audio Hardware Designer',
    scope: ['Transparent Casing', 'Unboxing Experience', '3D Product Render'],
    colorPalette: ['#84CC16', '#365314', '#F7FEE7', '#0F172A'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'ear-01',
        number: '01',
        title: 'Transparent Wireless Earbuds Case',
        category: 'AUDIO',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1400&auto=format&fit=crop&q=80',
        description: 'Futuristic clear-shell TWS earphone charging case visual design.'
      },
      {
        id: 'ear-02',
        number: '02',
        title: 'Tactile Touch Control Stem Detail',
        category: 'PRODUCT',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1400&auto=format&fit=crop&q=80',
        description: 'Close-up render of capacitive touch sensor and microphone grill.'
      },
      {
        id: 'ear-03',
        number: '03',
        title: 'Unboxing Packaging & Cable Tray',
        category: 'PACKAGING',
        year: '2025',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&auto=format&fit=crop&q=80',
        description: 'Multi-layer gift box with custom molded pulp earbud insert.'
      },
      {
        id: 'ear-04',
        number: '04',
        title: 'Active Noise Cancelling Companion App UI',
        category: 'AUDIO',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1400&auto=format&fit=crop&q=80',
        description: 'Mobile app screen for adjusting EQ presets and ANC modes.'
      }
    ]
  },
  {
    id: '06',
    slug: 'tactile-wallet',
    name: 'TACTILE WALLET',
    type: 'Product Design',
    year: '2027',
    worksCount: 4,
    designCount: 12,
    duration: '2026 – 2027',
    collectionId: '04',
    stats: {
      projects: 4,
      designs: '12+',
      duration: '2026 – 2027',
      categories: ['CRAFT', 'LEATHER', 'PACKAGING'],
    },
    overview: 'Slim leather RFID-blocking minimalist pop-up wallet product design and gift packaging box.',
    role: 'Product Designer',
    scope: ['Leather Crafting Spec', 'RFID Housing', 'Gift Box Packaging'],
    colorPalette: ['#78350F', '#451A03', '#FEF3C7', '#1F2937'],
    typography: ['Playfair Display'],
    allWorks: [
      {
        id: 'wallet-01',
        number: '01',
        title: 'Slim Leather Pop-Up Cardholder',
        category: 'CRAFT',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=1400&auto=format&fit=crop&q=80',
        description: 'Full-grain Italian leather card wallet with mechanical pop-up switch.'
      },
      {
        id: 'wallet-02',
        number: '02',
        title: 'RFID Blocking Aluminum Chamber',
        category: 'LEATHER',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1400&auto=format&fit=crop&q=80',
        description: 'Ultra-thin aluminum inner casing protecting cards against wireless theft.'
      },
      {
        id: 'wallet-03',
        number: '03',
        title: 'Matte Black Gift Presentation Box',
        category: 'PACKAGING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1400&auto=format&fit=crop&q=80',
        description: 'Magnetic closure luxury gift box with debossed bronze logo.'
      },
      {
        id: 'wallet-04',
        number: '04',
        title: 'Hand-Stitched Leather Grain Detail',
        category: 'CRAFT',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&auto=format&fit=crop&q=80',
        description: 'Macro photography highlighting wax thread stitching and burnished edges.'
      }
    ]
  },

  // ==========================================
  // SECTION 05: EVENTS
  // ==========================================
  {
    id: '01',
    slug: 'techsummit-2026',
    name: 'TECHSUMMIT 2026',
    type: 'Event Branding',
    year: '2026',
    worksCount: 16,
    designCount: 45,
    duration: '2026',
    collectionId: '05',
    stats: {
      projects: 16,
      designs: '45+',
      duration: '2026',
      categories: ['CONFERENCE', 'STAGE DESIGN', 'BADGES', 'BANNERS'],
    },
    overview: 'Complete environmental visual identity, LED stage screens, attendee badges, and directional signage for a 5,000-person tech summit.',
    role: 'Lead Event Brand Director',
    scope: ['Main Stage Motion Graphics', 'Lanyard & Badge Design', 'Wayfinding Signage', 'Event App UI'],
    colorPalette: ['#6366F1', '#312E81', '#EEF2FF', '#09090B'],
    typography: ['Space Grotesk', 'Inter'],
    allWorks: [
      {
        id: 'event-01',
        number: '01',
        title: 'Main Stage LED Motion Key Visual',
        category: 'CONFERENCE',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&auto=format&fit=crop&q=80',
        description: 'Ultra-wide 4K stage backdrop graphic animation for keynote speakers.'
      },
      {
        id: 'event-02',
        number: '02',
        title: 'Holographic Attendee Badge & Lanyard',
        category: 'BADGES',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&auto=format&fit=crop&q=80',
        description: 'Laser foil printed VIP passes with QR code event check-in.'
      },
      {
        id: 'event-03',
        number: '03',
        title: 'Venue Directional Wayfinding Signage',
        category: 'BANNERS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&auto=format&fit=crop&q=80',
        description: 'Freestanding light tower pillars for conference hall navigation.'
      },
      {
        id: 'event-04',
        number: '04',
        title: 'Keynote Speaker Presentation Slide Deck',
        category: 'STAGE DESIGN',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&auto=format&fit=crop&q=80',
        description: 'Cohesive widescreen presentation templates for 30+ event speakers.'
      }
    ]
  },
  {
    id: '02',
    slug: 'global-design-expo',
    name: 'GLOBAL DESIGN EXPO',
    type: 'Event Branding',
    year: '2026',
    worksCount: 12,
    designCount: 34,
    duration: '2026',
    collectionId: '05',
    stats: {
      projects: 12,
      designs: '34+',
      duration: '2026',
      categories: ['EXHIBITION', 'POSTERS', 'CATALOGUE'],
    },
    overview: 'Identity and printed catalog design for an international contemporary art and design exhibition held in Milan.',
    role: 'Exhibition Art Director',
    scope: ['Printed Exhibition Guide', 'Silkscreen Entry Posters', 'Gallery Wall Labels'],
    colorPalette: ['#171717', '#84CC16', '#F5F5F5', '#262626'],
    typography: ['Playfair Display', 'Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'expo-01',
        number: '01',
        title: 'Milan Design Expo Hero Poster',
        category: 'POSTERS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&auto=format&fit=crop&q=80',
        description: 'Large-format silkscreen poster featuring architectural typography.'
      },
      {
        id: 'expo-02',
        number: '02',
        title: 'Printed Exhibition Monograph Book',
        category: 'CATALOGUE',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1400&auto=format&fit=crop&q=80',
        description: 'Hardcover 200-page exhibition guide printed on heavy archival paper.'
      },
      {
        id: 'expo-03',
        number: '03',
        title: 'Gallery Wall Typography & Plaque Labels',
        category: 'EXHIBITION',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimal vinyl wall captions for featured international artwork.'
      },
      {
        id: 'expo-04',
        number: '04',
        title: 'Grand Entrance LED Motion Archway',
        category: 'POSTERS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1508997449629-303059a039c0?w=1400&auto=format&fit=crop&q=80',
        description: 'Kinetic light art installation welcoming 20,000+ expo visitors.'
      }
    ]
  },
  {
    id: '03',
    slug: 'designathon-26',
    name: "DESIGNATHON '26",
    type: 'Event Branding',
    year: '2026',
    worksCount: 10,
    designCount: 28,
    duration: '2026',
    collectionId: '05',
    stats: {
      projects: 10,
      designs: '28+',
      duration: '2026',
      categories: ['HACKATHON', 'MERCH', 'TROPHIES'],
    },
    overview: '48-hour global UI/UX hackathon brand identity, winner trophies, hoodie merch design, and live leaderboard website.',
    role: 'Lead Hackathon Branding Specialist',
    scope: ['Custom Trophies', 'Participant Hoodies', 'Twitch Stream Overlays', 'Leaderboard UI'],
    colorPalette: ['#EC4899', '#831843', '#FCE7F3', '#0F172A'],
    typography: ['Impact', 'Space Mono'],
    allWorks: [
      {
        id: 'hack-01',
        number: '01',
        title: 'Winner Trophy & Custom Merch',
        category: 'MERCH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&auto=format&fit=crop&q=80',
        description: 'Laser-cut acrylic trophies and embroidered developer hoodies.'
      },
      {
        id: 'hack-02',
        number: '02',
        title: 'Twitch Live Stream Overlay Graphic Suite',
        category: 'HACKATHON',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1400&auto=format&fit=crop&q=80',
        description: 'Dynamic broadcast graphics displaying mentor sessions and live judges.'
      },
      {
        id: 'hack-03',
        number: '03',
        title: '48-Hour Live Leaderboard Website',
        category: 'TROPHIES',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&auto=format&fit=crop&q=80',
        description: 'Real-time project submission counter and scoring matrix dashboard.'
      },
      {
        id: 'hack-04',
        number: '04',
        title: 'Participant Swag Bag & Sticker Pack',
        category: 'MERCH',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1400&auto=format&fit=crop&q=80',
        description: 'Neon tote bag, custom enamel pins, and vinyl sticker sheet.'
      }
    ]
  },
  {
    id: '04',
    slug: 'indie-dev-con',
    name: 'INDIE DEV CON',
    type: 'Event Branding',
    year: '2027',
    worksCount: 14,
    designCount: 38,
    duration: '2026 – 2027',
    collectionId: '05',
    stats: {
      projects: 14,
      designs: '38+',
      duration: '2026 – 2027',
      categories: ['GAMING', 'BOOTH DESIGN', 'WAYFINDING'],
    },
    overview: 'Independent game developers convention branding, booth backdrop stands, arcade retro posters, and ticketing passes.',
    role: 'Creative Director',
    scope: ['Arcade Posters', 'Booth Backdrops', 'VIP Event Passes'],
    colorPalette: ['#A855F7', '#581C87', '#F3E8FF', '#09090B'],
    typography: ['Press Start 2P', 'Outfit'],
    allWorks: [
      {
        id: 'con-01',
        number: '01',
        title: 'Indie Game Expo Booth Banner',
        category: 'GAMING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1400&auto=format&fit=crop&q=80',
        description: 'Retro pixel-art hybrid banner design for gaming booth displays.'
      },
      {
        id: 'con-02',
        number: '02',
        title: 'Arcade Poster & Silkscreen Prints',
        category: 'BOOTH DESIGN',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&auto=format&fit=crop&q=80',
        description: 'Collectible 8-bit aesthetic posters celebrating indie game creators.'
      },
      {
        id: 'con-03',
        number: '03',
        title: 'VIP Arcade Ticket Pass & Lanyard',
        category: 'WAYFINDING',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&auto=format&fit=crop&q=80',
        description: 'Plastic coin-shaped VIP passes and pixel art neck lanyards.'
      },
      {
        id: 'con-04',
        number: '04',
        title: 'Convention Floor Map & Guidebook',
        category: 'GAMING',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80',
        description: 'Foldable 16-page isometric booth map and schedule directory.'
      }
    ]
  },
  {
    id: '05',
    slug: 'future-vision-forum',
    name: 'FUTURE VISION FORUM',
    type: 'Event Branding',
    year: '2027',
    worksCount: 8,
    designCount: 20,
    duration: '2027',
    collectionId: '05',
    stats: {
      projects: 8,
      designs: '20+',
      duration: '2027',
      categories: ['SYMPOSIUM', 'PODIUM', 'DIGITAL'],
    },
    overview: 'Artificial intelligence ethics symposium branding, speaker podium graphics, and virtual livestream background artwork.',
    role: 'Visual Identity Lead',
    scope: ['Livestream Visuals', 'Podium Wraps', 'Digital Program Guide'],
    colorPalette: ['#0EA5E9', '#0369A1', '#E0F2FE', '#0F172A'],
    typography: ['Plus Jakarta Sans'],
    allWorks: [
      {
        id: 'forum-01',
        number: '01',
        title: 'Livestream Virtual Stage Art',
        category: 'SYMPOSIUM',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&auto=format&fit=crop&q=80',
        description: '3D abstract motion artwork for global virtual broadcast.'
      },
      {
        id: 'forum-02',
        number: '02',
        title: 'Speaker Podium Wrap & Screen Visuals',
        category: 'PODIUM',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&auto=format&fit=crop&q=80',
        description: 'Minimalist metallic stage lectern graphics and LED panels.'
      },
      {
        id: 'forum-03',
        number: '03',
        title: 'Digital Interactive Program App UI',
        category: 'DIGITAL',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1400&auto=format&fit=crop&q=80',
        description: 'Mobile web app for viewing speaker bios and submitting Q&A.'
      },
      {
        id: 'forum-04',
        number: '04',
        title: 'Keynote Abstract 3D Video Banners',
        category: 'SYMPOSIUM',
        year: '2027',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
        description: 'Fluid blue gradient motion loops playing during session breaks.'
      }
    ]
  },
  {
    id: '06',
    slug: 'music-fest-stage',
    name: 'MUSIC FEST STAGE',
    type: 'Event Branding',
    year: '2026',
    worksCount: 18,
    designCount: 52,
    duration: '2026',
    collectionId: '05',
    stats: {
      projects: 18,
      designs: '52+',
      duration: '2026',
      categories: ['FESTIVAL', 'STAGE GRAPHICS', 'WRISTBANDS'],
    },
    overview: 'Outdoor summer music festival branding, stage visuals, VIP fabric wristbands, and food truck area signage.',
    role: 'Festival Creative Lead',
    scope: ['Stage Screen Visuals', 'Woven Wristbands', 'Festival Map'],
    colorPalette: ['#F59E0B', '#B45309', '#FEF3C7', '#111827'],
    typography: ['Impact', 'Inter'],
    allWorks: [
      {
        id: 'fest-01',
        number: '01',
        title: 'Outdoor Stage Screen Visuals',
        category: 'FESTIVAL',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&auto=format&fit=crop&q=80',
        description: 'Vibrant neon concert visuals rendered for massive outdoor LED arrays.'
      },
      {
        id: 'fest-02',
        number: '02',
        title: 'VIP Woven Fabric Wristband Design',
        category: 'WRISTBANDS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&auto=format&fit=crop&q=80',
        description: 'Multi-color woven festival wristbands with aluminum locking clasp.'
      },
      {
        id: 'fest-03',
        number: '03',
        title: 'Festival Grounds Illustrated Map Signage',
        category: 'STAGE GRAPHICS',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&auto=format&fit=crop&q=80',
        description: 'Vector map towers highlighting stages, medical tents, and food zones.'
      },
      {
        id: 'fest-04',
        number: '04',
        title: 'Food Truck Area Visual Identity',
        category: 'FESTIVAL',
        year: '2026',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&fit=crop&q=80',
        description: 'Festive hanging banners and illuminated food vendor signs.'
      }
    ]
  }
];
