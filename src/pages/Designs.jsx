import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import DesignsHero from '@/components/Designs/DesignsHero';
import DesignCard from '@/components/Designs/DesignCard';
import DesignDetail from '@/components/Designs/DesignDetail';
import BrandArchiveSection from '@/components/Designs/BrandArchiveSection';
import { portfolioApi } from '@/api/portfolioApi';

const categories = ['All', 'Branding', 'Packaging', 'Posters', 'Social Media', 'UI/UX', 'Print', 'Illustrations', 'Reels', 'Banners', 'Large Format'];
const ITEMS_PER_PAGE = 6;

const mapProject = (e) => ({
  id: e.id,
  title: e.title,
  date: e.date || '',
  client: e.client || '',
  category: e.category,
  teamProject: e.team_project || false,
  software: e.software_used || [],
  description: e.description,
  personalNote: e.personal_note || '',
  tags: e.tags || [],
  thumbnail: e.thumbnail || '',
  gallery: e.gallery || [],
  detail: {
    overview: e.overview || '',
    challenges: e.challenges || [],
    process: e.process || [],
    tools: e.tools || [],
    colorPalette: e.color_palette || [],
    typography: e.typography_specs || [],
    timeline: [],
    learnings: e.learnings || '',
    notes: e.notes || '',
  },
});

export default function Designs() {
  const [viewMode, setViewMode] = useState("archive"); // "archive" | "grid"
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [allProjects, setAllProjects] = useState([]);
  const sentinelRef = useRef(null);

  useEffect(() => {
    portfolioApi.entities.DesignProject.list('-created_date', 100)
      .then(data => { if (data.length > 0) setAllProjects(data.map(mapProject)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeCategory]);

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        p.software.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setVisibleCount(prev => prev + ITEMS_PER_PAGE);
        }
      },
      { rootMargin: '200px' }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  const handleSelectBrandProject = (brand) => {
    // Look up if matching project in allProjects, or generate formatted project
    const match = allProjects.find(p => p.client?.toLowerCase().includes(brand.name.toLowerCase()) || p.title?.toLowerCase().includes(brand.name.toLowerCase()));
    if (match) {
      setSelected(match);
    } else {
      setSelected({
        id: brand.id,
        title: brand.name,
        client: brand.name,
        category: brand.stats?.categories?.[0] || 'Branding',
        software: ['Photoshop', 'Illustrator', 'Figma'],
        description: `Comprehensive brand design system, packaging, and digital campaign suite for ${brand.name}.`,
        thumbnail: brand.heroCard?.dishImage,
        gallery: [
          brand.heroCard?.dishImage,
          brand.sideCardLeft?.dishImage,
          brand.sideCardRight?.dishImage,
          brand.socialPostTop?.image,
          brand.socialPostBottom?.image
        ].filter(Boolean),
        detail: {
          overview: `Full design identity, packaging system, and social media marketing collateral created for ${brand.name}.`,
          challenges: ['Creating distinctive visual identity', 'Ensuring shelf stand-out', 'Consistent multi-channel collateral'],
          process: ['Brand discovery & strategy', 'Visual moodboarding', 'Packaging prototype design', 'Campaign asset generation'],
          tools: ['Photoshop', 'Illustrator', 'Figma', 'Lightroom'],
          colorPalette: ['#84cc16', '#a3e635', '#0f0f0f', '#f9f8f6'],
          typography: ['Playfair Display', 'Plus Jakarta Sans'],
          learnings: 'Delivered an integrated editorial design system across print and digital media.',
          notes: 'Client work & high-impact visual identity.'
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-ivory/30">
      {/* Existing Hero Component - Completely Untouched */}
      <DesignsHero />

      {/* Main Content: Editorial Archive View (Default) or Full Grid View */}
      {viewMode === "archive" ? (
        <BrandArchiveSection
          onToggleGridView={() => setViewMode("grid")}
          onSelectProject={handleSelectBrandProject}
        />
      ) : (
        <>
          <section className="py-4 px-4 sm:px-6 bg-ivory border-b border-sand">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode("archive")}
                    className="px-4 py-2 text-xs font-bold rounded-full bg-[#a3e635] text-obsidian uppercase tracking-wider shadow-sm hover:bg-obsidian hover:text-white transition-colors"
                  >
                    ← EDITORIAL ARCHIVE VIEW
                  </button>
                  <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/30" />
                    <input
                      type="text"
                      placeholder="Search by project, client, category..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-11 pr-5 py-3 text-sm bg-white border border-sand/80 rounded-2xl shadow-sm outline-none transition-all duration-300 focus:border-indigo/40 focus:shadow-md focus:ring-4 focus:ring-indigo/5 placeholder:text-obsidian/30"
                    />
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        activeCategory === cat
                          ? "bg-obsidian text-ivory"
                          : "bg-white/60 text-obsidian/50 hover:bg-white hover:text-obsidian border border-sand/60"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 sm:py-16 px-4 sm:px-6">
            <div className="max-w-[1440px] mx-auto">
              <p className="text-sm text-obsidian/40 mb-8">
                Showing <span className="text-obsidian/60 font-medium">{visible.length}</span> of{" "}
                <span className="text-obsidian/60 font-medium">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "project" : "projects"}
                {activeCategory !== "All" && ` in ${activeCategory}`}
              </p>

              <AnimatePresence mode="popLayout">
                {visible.length > 0 ? (
                  <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {visible.map((project, i) => (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <DesignCard project={project} onClick={() => setSelected(project)} index={i} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                    <p className="text-lg font-heading text-obsidian/40">No projects found.</p>
                    <p className="text-sm text-obsidian/30 mt-2">Try a different search or category.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasMore && (
                <div ref={sentinelRef} className="flex items-center justify-center py-12">
                  <Loader2 size={24} className="animate-spin text-obsidian/30" />
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <DesignDetail project={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
