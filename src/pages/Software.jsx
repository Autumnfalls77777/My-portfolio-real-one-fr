import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, Loader2 } from 'lucide-react';
import SoftwareHero from '@/components/Software/SoftwareHero';
import SoftwareCard from '@/components/Software/SoftwareCard';
import SoftwareDetail from '@/components/Software/SoftwareDetail';
import softwareData from '@/data/software.json';
import { portfolioApi } from '@/api/portfolioApi';

const { categories, sortOptions } = softwareData;
const ITEMS_PER_PAGE = 6;

const mapProject = (e) => ({
  id: e.id,
  title: e.title,
  type: e.project_type || '',
  category: e.category,
  completionDate: e.completion_date || '',
  status: e.status || 'In Progress',
  techStack: e.tech_stack || [],
  description: e.description,
  role: e.role || '',
  teamProject: e.team_project || false,
  github: e.github_url || '#',
  liveDemo: e.live_demo_url || '',
  personalNotes: e.personal_notes || '',
  thumbnail: e.thumbnail || '',
  complexity: e.complexity || 0,
  screenshots: e.screenshots || [],
  detail: {
    overview: e.overview || '',
    problemStatement: e.problem_statement || '',
    solution: e.solution || '',
    features: e.features || [],
    techStack: e.detailed_tech_stack || e.tech_stack || [],
    architecture: e.architecture || '',
    challenges: e.challenges || [],
    futureImprovements: e.future_improvements || [],
    developmentTimeline: [],
  },
});

export default function Software() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [allProjects, setAllProjects] = useState([]);
  const sentinelRef = useRef(null);

  useEffect(() => {
    portfolioApi.entities.SoftwareProject.list('-created_date', 100)
      .then(data => { if (data.length > 0) setAllProjects(data.map(mapProject)); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeCategory, sortBy]);

  const filtered = useMemo(() => {
    let result = allProjects.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        (p.description || '').toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
    const parseDate = (str) => { const [m, y] = str.split(" "); return new Date(parseInt(y), months[m] || 0); };
    if (sortBy === "Newest") {
      result = [...result].sort((a, b) => parseDate(b.completionDate) - parseDate(a.completionDate));
    } else if (sortBy === "Oldest") {
      result = [...result].sort((a, b) => parseDate(a.completionDate) - parseDate(b.completionDate));
    } else if (sortBy === "Most Complex") {
      result = [...result].sort((a, b) => b.complexity - a.complexity);
    }

    return result;
  }, [allProjects, search, activeCategory, sortBy]);

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
    <div className="min-h-screen">
      <SoftwareHero />

      <section className="py-4 px-4 sm:px-6 bg-ivory border-b border-sand">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/30" />
              <input
                type="text"
                placeholder="Search by name, tech, type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-5 py-3 text-sm bg-white border border-sand/80 rounded-2xl shadow-sm outline-none transition-all duration-300 focus:border-indigo/40 focus:shadow-md focus:ring-4 focus:ring-indigo/5 placeholder:text-obsidian/30"
              />
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

            <div className="relative flex-shrink-0">
              <ArrowUpDown size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-6 py-2.5 text-xs font-medium bg-white border border-sand/60 rounded-2xl outline-none cursor-pointer transition-all duration-300 focus:border-indigo/40 shadow-sm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
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
            {sortBy !== "Newest" && ` · sorted by ${sortBy}`}
          </p>

          <AnimatePresence mode="popLayout">
            {visible.length > 0 ? (
              <motion.div layout className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                {visible.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <SoftwareCard project={project} onClick={() => setSelected(project)} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                <p className="text-lg font-heading text-obsidian/40">No projects found.</p>
                <p className="text-sm text-obsidian/30 mt-2">Try a different search or filter.</p>
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

      <SoftwareDetail project={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
