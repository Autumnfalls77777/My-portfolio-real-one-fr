import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowLeft, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import DesignsHero from '@/components/Designs/DesignsHero';
import DesignCard from '@/components/Designs/DesignCard';
import DesignDetail from '@/components/Designs/DesignDetail';
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

export default function DesignsGrid() {
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

  return (
    <div className="min-h-screen bg-ivory/30">
      <DesignsHero />

      {/* FILTER & SEARCH BAR HEADER */}
      <section className="py-6 px-4 sm:px-6 bg-ivory border-b border-sand sticky top-16 z-30 shadow-xs">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/designs"
                className="px-4 py-2.5 text-xs font-bold rounded-full bg-[#a3e635] text-obsidian uppercase tracking-wider shadow-sm hover:bg-obsidian hover:text-white transition-all flex items-center gap-2 group shrink-0"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>ARCHIVE VIEW</span>
              </Link>
              
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/30" />
                <input
                  type="text"
                  placeholder="Search by project, client, category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-5 py-2.5 text-sm bg-white border border-sand/80 rounded-2xl shadow-sm outline-none transition-all duration-300 focus:border-indigo/40 focus:shadow-md focus:ring-4 focus:ring-indigo/5 placeholder:text-obsidian/30"
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
                      ? "bg-obsidian text-ivory shadow-md"
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

      {/* FULL PROJECT CARDS GRID */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between mb-8 border-b border-sand/40 pb-4">
            <p className="text-sm text-obsidian/60 font-body">
              Showing <span className="text-obsidian font-bold">{visible.length}</span> of{" "}
              <span className="text-obsidian font-bold">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "project" : "projects"}
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-obsidian/40 uppercase">
              <LayoutGrid size={14} />
              <span>Full Portfolio Grid</span>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {visible.length > 0 ? (
              <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <p className="text-sm text-obsidian/30 mt-2">Try a different search query or category filter.</p>
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

      <DesignDetail project={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
