import React, { useState, useEffect, useMemo } from 'react';
import { portfolioApi } from '@/api/portfolioApi';
import {
  Check, Search, Save, Loader2, Sparkles,
  Palette, Cpu, CheckCircle2, RefreshCw, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_IMAGES = {
  design: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  software: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
};

export default function ProjectSelectionManager({ entityName, title, onSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [existingDbItems, setExistingDbItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'design' | 'software'
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

  const isShowcase = entityName === 'ShowcaseItem';
  const sectionLabel = isShowcase ? 'Selected Works' : 'Featured Projects';

  const loadData = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // 1. Fetch current target items (ShowcaseItems or FeaturedProjects)
      const currentItems = await portfolioApi.entities[entityName].list('order', 100).catch(() => []);
      setExistingDbItems(currentItems);

      // 2. Fetch listed Design projects & Software projects
      const [brandCards, brandWorks, designProjects, softwareProjects] = await Promise.all([
        portfolioApi.entities.BrandCard.list('order', 100).catch(() => []),
        portfolioApi.entities.BrandWork.list('order', 300).catch(() => []),
        portfolioApi.entities.DesignProject.list('order', 100).catch(() => []),
        portfolioApi.entities.SoftwareProject.list('order', 100).catch(() => []),
      ]);

      const projectsList = [];

      // Map Design Projects (from BrandCards + BrandWorks or DesignProjects)
      if (brandCards.length > 0) {
        brandCards.forEach(card => {
          const cardWorks = brandWorks.filter(w => w.brand_slug === card.slug || w.brandSlug === card.slug);
          const firstWorkImage = cardWorks[0]?.image_url || cardWorks[0]?.imageUrl;
          
          projectsList.push({
            id: `design-${card.id || card.slug}`,
            sourceId: card.id,
            title: card.name,
            category: card.brand_type || card.brandType || 'Brand Identity',
            description: card.overview || `Design work for ${card.name}`,
            source: 'design',
            image_url: firstWorkImage || card.thumbnail || DEFAULT_IMAGES.design,
            tech_stack: card.software_used || ['Figma', 'Photoshop'],
            github_url: '#',
            live_demo_url: '#',
            raw: card,
          });
        });
      } else if (designProjects.length > 0) {
        designProjects.forEach(dp => {
          projectsList.push({
            id: `design-${dp.id || dp.slug}`,
            sourceId: dp.id,
            title: dp.title,
            category: dp.category || 'Design',
            description: dp.description || '',
            source: 'design',
            image_url: dp.thumbnail || dp.image_url || DEFAULT_IMAGES.design,
            tech_stack: dp.software_used || dp.tags || ['Figma'],
            github_url: '#',
            live_demo_url: dp.case_study_url || '#',
            raw: dp,
          });
        });
      }

      // Map Software Projects
      if (softwareProjects.length > 0) {
        softwareProjects.forEach(sp => {
          projectsList.push({
            id: `software-${sp.id || sp.slug}`,
            sourceId: sp.id,
            title: sp.title,
            category: sp.category || sp.project_type || 'Software',
            description: sp.description || '',
            source: 'software',
            image_url: sp.image_url || sp.thumbnail || DEFAULT_IMAGES.software,
            tech_stack: sp.tech_stack || sp.techStack || [],
            github_url: sp.github_url || sp.githubUrl || '#',
            live_demo_url: sp.live_demo_url || sp.liveDemoUrl || '#',
            raw: sp,
          });
        });
      }

      setAvailableProjects(projectsList);

      // Match initial selections based on existing db items
      const initialSelected = new Set();
      currentItems.forEach(item => {
        const itemTitleNorm = (item.title || '').trim().toLowerCase();
        const match = projectsList.find(p => p.title.trim().toLowerCase() === itemTitleNorm);
        if (match) {
          initialSelected.add(match.id);
        }
      });

      setSelectedIds(initialSelected);
    } catch (err) {
      console.error('[ProjectSelectionManager] load error', err);
      setMessage({ type: 'error', text: 'Failed to load projects list.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [entityName]);

  // Toggle selection of a project
  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    const allFiltered = filteredProjects.map(p => p.id);
    setSelectedIds(prev => new Set([...prev, ...allFiltered]));
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  // Save selected items to backend
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const selectedProjects = availableProjects.filter(p => selectedIds.has(p.id));

      if (isShowcase) {
        // ── SAVE SHOWCASE ITEMS ──
        // 1. Existing items by title
        const existingMapByTitle = new Map(
          existingDbItems.map(item => [(item.title || '').trim().toLowerCase(), item])
        );

        // Track which existing items were kept
        const keptExistingIds = new Set();

        for (let i = 0; i < selectedProjects.length; i++) {
          const proj = selectedProjects[i];
          const titleNorm = proj.title.trim().toLowerCase();
          const existing = existingMapByTitle.get(titleNorm);

          const payload = {
            title: proj.title,
            category: proj.category || (proj.source === 'software' ? 'Software' : 'Design'),
            image_url: proj.image_url || '',
            order: i,
            status: 'PUBLISHED',
          };

          if (existing) {
            keptExistingIds.add(existing.id);
            await portfolioApi.entities.ShowcaseItem.update(existing.id, payload);
          } else {
            await portfolioApi.entities.ShowcaseItem.create(payload);
          }
        }

        // Delete unselected existing items
        for (const item of existingDbItems) {
          if (!keptExistingIds.has(item.id)) {
            await portfolioApi.entities.ShowcaseItem.delete(item.id).catch(e => {
              console.warn(`Could not delete ShowcaseItem ${item.id}`, e);
            });
          }
        }
      } else {
        // ── SAVE FEATURED PROJECTS ──
        const existingMapByTitle = new Map(
          existingDbItems.map(item => [(item.title || '').trim().toLowerCase(), item])
        );

        const keptExistingIds = new Set();

        for (let i = 0; i < selectedProjects.length; i++) {
          const proj = selectedProjects[i];
          const titleNorm = proj.title.trim().toLowerCase();
          const existing = existingMapByTitle.get(titleNorm);

          const payload = {
            title: proj.title,
            description: proj.description || `Featured ${proj.category} project`,
            tech: proj.tech_stack || [],
            github_url: proj.github_url || '#',
            case_study_url: proj.live_demo_url || '#',
            image_url: proj.image_url || '',
            order: i,
            status: 'PUBLISHED',
          };

          if (existing) {
            keptExistingIds.add(existing.id);
            await portfolioApi.entities.FeaturedProject.update(existing.id, payload);
          } else {
            await portfolioApi.entities.FeaturedProject.create(payload);
          }
        }

        // Delete unselected existing items
        for (const item of existingDbItems) {
          if (!keptExistingIds.has(item.id)) {
            await portfolioApi.entities.FeaturedProject.delete(item.id).catch(e => {
              console.warn(`Could not delete FeaturedProject ${item.id}`, e);
            });
          }
        }
      }

      setMessage({
        type: 'success',
        text: `Successfully saved ${selectedProjects.length} project(s) to ${sectionLabel}!`,
      });

      // Refresh data
      await loadData();
      if (onSaved) onSaved();
    } catch (err) {
      console.error('[ProjectSelectionManager] save error', err);
      setMessage({
        type: 'error',
        text: err.message || 'Failed to save selected projects. Please try again.',
      });
    } finally {
      setSaving(false);
    }
  };

  // Filter & Search Logic
  const filteredProjects = useMemo(() => {
    return availableProjects.filter(proj => {
      const matchesFilter =
        activeFilter === 'all' || proj.source === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [availableProjects, activeFilter, searchQuery]);

  const countDesign = availableProjects.filter(p => p.source === 'design').length;
  const countSoftware = availableProjects.filter(p => p.source === 'software').length;

  return (
    <div className="mb-10 bg-white border border-sand/80 rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-sand/60">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C49A6C]">
            <Sparkles size={14} />
            <span>Listed Projects Selector</span>
          </div>
          <h3 className="text-lg font-heading font-bold text-obsidian mt-0.5">
            Select Projects for {sectionLabel}
          </h3>
          <p className="text-xs text-obsidian/50 mt-0.5">
            Click on any project from your Designs or Software catalog to add it here, then click Save.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2 text-obsidian/40 hover:text-obsidian hover:bg-sand/40 rounded-xl transition-colors"
            title="Refresh projects list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-obsidian text-ivory text-xs font-semibold rounded-xl hover:bg-charcoal transition-all shadow-md disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'Saving...' : `Save ${selectedIds.size} Selected`}
          </button>
        </div>
      </div>

      {/* Alert message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 p-3.5 rounded-xl text-xs font-medium flex items-center justify-between gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              )}
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage(null)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-5 mb-4">
        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-[#F9F8F6] p-1 rounded-xl border border-sand/60">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-obsidian shadow-sm font-semibold'
                : 'text-obsidian/50 hover:text-obsidian'
            }`}
          >
            All ({availableProjects.length})
          </button>
          <button
            onClick={() => setActiveFilter('design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === 'design'
                ? 'bg-white text-[#C49A6C] shadow-sm font-semibold'
                : 'text-obsidian/50 hover:text-obsidian'
            }`}
          >
            <Palette size={13} />
            <span>Designs ({countDesign})</span>
          </button>
          <button
            onClick={() => setActiveFilter('software')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeFilter === 'software'
                ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                : 'text-obsidian/50 hover:text-obsidian'
            }`}
          >
            <Cpu size={13} />
            <span>Software ({countSoftware})</span>
          </button>
        </div>

        {/* Search & Selection quick actions */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search catalog..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-[#C49A6C] text-obsidian"
            />
          </div>
          <button
            onClick={handleSelectAll}
            className="px-2.5 py-1.5 text-[11px] font-medium text-obsidian/60 hover:text-obsidian bg-sand/30 hover:bg-sand/60 rounded-lg transition-colors whitespace-nowrap"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-2.5 py-1.5 text-[11px] font-medium text-obsidian/60 hover:text-obsidian bg-sand/30 hover:bg-sand/60 rounded-lg transition-colors whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Grid of Projects */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-obsidian/40 gap-2">
          <Loader2 size={24} className="animate-spin text-[#C49A6C]" />
          <p className="text-xs">Loading listed projects catalog...</p>
        </div>
      ) : availableProjects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-sand rounded-xl bg-[#F9F8F6]/50">
          <p className="text-xs text-obsidian/50 font-medium">No Design or Software projects found in catalog.</p>
          <p className="text-[11px] text-obsidian/35 mt-1">Create projects under "Design Projects" or "Software Projects" tabs first.</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-sand rounded-xl bg-[#F9F8F6]/50">
          <p className="text-xs text-obsidian/50 font-medium">No projects match "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-h-[480px] overflow-y-auto pr-1">
          {filteredProjects.map(proj => {
            const isSelected = selectedIds.has(proj.id);
            const isDesign = proj.source === 'design';

            return (
              <div
                key={proj.id}
                onClick={() => toggleSelect(proj.id)}
                className={`
                  group relative flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border text-left
                  ${
                    isSelected
                      ? 'border-[#C49A6C] bg-amber-500/5 shadow-md ring-2 ring-[#C49A6C]/30'
                      : 'border-sand/70 bg-white hover:border-obsidian/30 hover:shadow-sm'
                  }
                `}
              >
                {/* Media Header */}
                <div className="relative aspect-[16/10] bg-obsidian/5 overflow-hidden">
                  <img
                    src={proj.image_url}
                    alt={proj.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      isSelected ? 'brightness-100' : 'brightness-95 group-hover:brightness-100'
                    }`}
                    onError={e => {
                      e.currentTarget.src = isDesign ? DEFAULT_IMAGES.design : DEFAULT_IMAGES.software;
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Source Badge (Design vs Software) */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide shadow-sm text-white ${
                        isDesign ? 'bg-[#C49A6C]' : 'bg-indigo-600'
                      }`}
                    >
                      {isDesign ? <Palette size={10} /> : <Cpu size={10} />}
                      {isDesign ? 'Design' : 'Software'}
                    </span>
                  </div>

                  {/* Checkbox indicator */}
                  <div className="absolute top-2.5 right-2.5">
                    <div
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all shadow-md
                        ${
                          isSelected
                            ? 'bg-[#C49A6C] text-white scale-110'
                            : 'bg-white/80 text-transparent border border-white/60 hover:bg-white'
                        }
                      `}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Category tag on image bottom */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 truncate">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-white/80">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className={`text-xs font-bold truncate ${isSelected ? 'text-[#9A7447]' : 'text-obsidian'}`}>
                      {proj.title}
                    </h4>
                    {proj.description && (
                      <p className="text-[11px] text-obsidian/45 line-clamp-2 mt-0.5 leading-snug">
                        {proj.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
