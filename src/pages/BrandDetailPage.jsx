import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Folder, Image as ImageIcon, Calendar, Tag, Maximize2, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { brandsData } from '@/data/brandsData';

export default function BrandDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find brand by slug
  const brandIndex = brandsData.findIndex((b) => b.slug === slug);
  const brand = brandsData[brandIndex];

  // State for currently selected design index
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const viewerRef = useRef(null);

  // Calculate prev and next brands automatically
  const prevBrand = brandIndex > 0 ? brandsData[brandIndex - 1] : brandsData[brandsData.length - 1];
  const nextBrand = brandIndex < brandsData.length - 1 ? brandsData[brandIndex + 1] : brandsData[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveIndex(0);
    setSelectedCategory('ALL');
  }, [slug]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl sm:text-5xl font-heading font-bold text-obsidian mb-4">Brand Not Found</h1>
        <p className="text-obsidian/50 max-w-md mb-8">
          The requested brand case study could not be located in our archive database.
        </p>
        <Link
          to="/designs"
          className="px-6 py-3 rounded-full bg-[#84cc16] text-obsidian font-bold text-xs uppercase tracking-widest hover:bg-obsidian hover:text-white transition-colors"
        >
          ← Return to Design Archive
        </Link>
      </div>
    );
  }

  const {
    name,
    type,
    year,
    worksCount,
    designCount,
    duration,
    stats,
    overview,
    role,
    scope,
    colorPalette,
    allWorks: customWorks,
  } = brand;

  // Fallback works array if customized list is missing
  const works = customWorks && customWorks.length > 0 ? customWorks : [
    {
      id: 'work-1',
      number: '01',
      title: 'Brand Identity & Logomark',
      category: 'BRAND IDENTITY',
      year: year || '2026',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
      description: 'Core visual identity and logomark guidelines.'
    }
  ];

  // Derive unique categories for filtering
  const availableCategories = ['ALL', ...Array.from(new Set(works.map((w) => w.category).filter(Boolean)))];

  // Filter works based on active category filter for ALL WORK grid
  const filteredWorks = selectedCategory === 'ALL'
    ? works
    : works.filter((w) => w.category === selectedCategory);

  const currentWork = works[activeIndex] || works[0];
  const totalWorks = works.length;

  const handlePrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalWorks) % totalWorks);
  };

  const handleNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalWorks);
  };

  const handleSelectWorkFromThumbnail = (work) => {
    const originalIndex = works.findIndex((w) => w.id === work.id);
    if (originalIndex !== -1) {
      setActiveIndex(originalIndex);
    }
    // Smooth scroll back to large viewer
    if (viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categoriesList = stats?.categories || ['BRAND IDENTITY', 'UI/UX', 'DESIGN SYSTEM', 'WEB'];

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-obsidian pt-24 sm:pt-28 lg:pt-32 pb-16 px-4 sm:px-8 xl:px-12 max-w-[1440px] mx-auto">
      
      {/* 1. TOP BREADCRUMB & HEADER STATUS BAR - Positioned safely below Navbar */}
      <div className="flex items-center justify-between border-b border-sand/70 pb-5 mb-10 relative z-30">
        <Link
          to="/designs"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sand/90 hover:border-obsidian bg-white hover:bg-ivory transition-all duration-300 text-xs font-bold text-obsidian tracking-wider uppercase shadow-xs cursor-pointer"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>ALL CLIENT WORK</span>
        </Link>

        <div className="flex items-center gap-3 text-xs font-mono text-obsidian/70 font-semibold uppercase">
          <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] shadow-[0_0_8px_rgba(132,204,22,0.8)]" />
          <span>{type || 'CLIENT WORK'}</span>
          <span>•</span>
          <span>{year}</span>
        </div>
      </div>

      {/* 2. BRAND INTRODUCTION / CASE STUDY HERO (CLEAN EDITORIAL 2-COLUMN INTRO) */}
      <section className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 border-b border-sand/70 pb-16">
        
        {/* LEFT SIDE: Brand Title, Description, Role & Scope */}
        <div className="lg:col-span-7 space-y-7">
          <div>
            <span className="text-xs font-bold tracking-[0.24em] text-[#84cc16] uppercase font-body">
              CASE STUDY & BRAND ARCHIVE
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-obsidian uppercase mt-2.5 leading-[1.02]">
              {name}
            </h1>
            <p className="text-base sm:text-lg font-body text-obsidian/80 leading-relaxed mt-5 font-normal max-w-2xl">
              {overview}
            </p>
          </div>

          <div className="space-y-5 pt-2">
            <div>
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-obsidian/50 mb-1.5 font-mono">MY ROLE</h4>
              <p className="text-base sm:text-lg font-bold text-obsidian font-sans">{role || 'Lead Identity & Digital UI Designer'}</p>
            </div>

            {scope && scope.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-obsidian/50 mb-2.5 font-mono">SCOPE OF WORK</h4>
                <div className="flex flex-wrap gap-2">
                  {scope.map((item) => (
                    <span key={item} className="px-3.5 py-1.5 rounded-lg bg-white border border-sand/90 text-xs font-bold text-obsidian/85 shadow-2xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Metadata Cards & Color Palette */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-white border border-sand/80 rounded-2xl shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] shrink-0">
                <Folder size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-lg font-bold text-obsidian leading-none">{worksCount || totalWorks} Projects</p>
                <p className="text-[10px] font-bold text-obsidian/40 uppercase mt-1 tracking-wider font-mono">SCOPE</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-sand/80 rounded-2xl shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] shrink-0">
                <ImageIcon size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-lg font-bold text-obsidian leading-none">{designCount || '30+'}+ Designs</p>
                <p className="text-[10px] font-bold text-obsidian/40 uppercase mt-1 tracking-wider font-mono">DELIVERABLES</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-sand/80 rounded-2xl shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] shrink-0">
                <Calendar size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-obsidian leading-none">{duration}</p>
                <p className="text-[10px] font-bold text-obsidian/40 uppercase mt-1 tracking-wider font-mono">TIMELINE</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-sand/80 rounded-2xl shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] shrink-0">
                <Tag size={18} strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs font-bold text-obsidian uppercase leading-tight">{categoriesList.join(', ')}</p>
                <p className="text-[10px] font-bold text-obsidian/40 uppercase mt-1 tracking-wider font-mono">CATEGORIES</p>
              </div>
            </div>
          </div>

          {colorPalette && colorPalette.length > 0 && (
            <div className="p-4 bg-white border border-sand/80 rounded-2xl shadow-2xs">
              <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-obsidian/40 mb-2.5 font-mono">COLOR PALETTE</h4>
              <div className="flex items-center gap-3">
                {colorPalette.map((color) => (
                  <div key={color} className="flex flex-col items-center">
                    <span className="w-8 h-8 rounded-lg border border-black/10 shadow-2xs" style={{ backgroundColor: color }} />
                    <span className="text-[9px] font-mono font-bold text-obsidian/60 mt-1">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </section>

      {/* 3. SEPARATE "SELECTED WORK" / LARGE INDIVIDUAL DESIGN VIEWER (LIGHT SHADE BACKGROUND CANVAS) */}
      <section ref={viewerRef} className="mb-20 scroll-mt-28">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-sand/70 pb-4 mb-6">
          <h2 className="text-xs sm:text-base font-bold tracking-[0.22em] text-obsidian uppercase font-body">
            SELECTED WORK
          </h2>
          <span className="text-xs sm:text-base font-bold font-mono text-[#84cc16] bg-obsidian px-3 py-1 rounded-full tracking-wider uppercase">
            {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {totalWorks < 10 ? `0${totalWorks}` : totalWorks}
          </span>
        </div>

        {/* LARGE STAGE CANVAS WITH LIGHT SHADE BACKGROUND (#F2F0EB) */}
        <div className="relative w-full bg-[#F2F0EB] border border-sand/90 rounded-3xl p-4 sm:p-8 shadow-xl overflow-hidden min-h-[480px] sm:min-h-[620px] lg:min-h-[720px] flex flex-col justify-between">
          
          {/* Top Canvas Controls: Category Tag & Maximize Lightbox */}
          <div className="w-full flex items-center justify-between z-20 pb-2">
            <span className="text-xs font-mono font-bold text-obsidian uppercase tracking-widest bg-white border border-sand/80 px-3.5 py-1 rounded-full shadow-2xs">
              {currentWork.category}
            </span>

            <button
              onClick={() => setIsLightboxOpen(true)}
              title="Expand Full Screen"
              className="w-10 h-10 rounded-full bg-white hover:bg-obsidian hover:text-white border border-sand/80 text-obsidian flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Large Main Artwork Viewer Stage */}
          <div className="relative w-full my-auto py-4 flex items-center justify-center min-h-[380px] sm:min-h-[520px] lg:min-h-[580px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWork.id || activeIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-[92%] h-[50vh] sm:h-[65vh] lg:h-[72vh] flex items-center justify-center cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img
                  src={currentWork.image}
                  alt={currentWork.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-xl border border-black/10"
                />
              </motion.div>
            </AnimatePresence>

            {/* Left Circular Navigation Arrow */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous Work"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-sand/90 bg-white hover:bg-obsidian hover:text-white text-obsidian flex items-center justify-center transition-all duration-300 z-30 shadow-md cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Circular Navigation Arrow */}
            <button
              onClick={handleNextSlide}
              aria-label="Next Work"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-sand/90 bg-white hover:bg-obsidian hover:text-white text-obsidian flex items-center justify-center transition-all duration-300 z-30 shadow-md cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Work Information Footer inside Light Canvas */}
          <div className="w-full border-t border-sand/80 pt-4 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 z-20">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold font-heading text-obsidian">
                {currentWork.title}
              </h3>
              {currentWork.description && (
                <p className="text-xs sm:text-sm text-obsidian/75 font-sans mt-0.5 max-w-3xl">
                  {currentWork.description}
                </p>
              )}
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs font-mono font-bold text-obsidian/50 block">
                YEAR: {currentWork.year || year || '2026'}
              </span>
              <span className="text-xs font-mono font-bold text-[#84cc16] block mt-0.5">
                SLIDE {activeIndex + 1} OF {totalWorks}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. "ALL WORK" THUMBNAIL GALLERY INDEX (SYNCHRONIZED WITH VIEWER) */}
      <section className="mb-20 border-t border-sand/70 pt-10">
        
        {/* Section Header & Category Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xs sm:text-base font-bold tracking-[0.22em] text-obsidian uppercase font-body">
              ALL WORK
            </h2>
            <p className="text-xs text-obsidian/50 mt-1">
              Click any thumbnail to preview at large scale above
            </p>
          </div>

          {/* Category Filter Pills */}
          {availableCategories.length > 2 && (
            <div className="flex flex-wrap gap-1.5">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-obsidian text-white shadow-xs'
                      : 'bg-white border border-sand/80 text-obsidian/60 hover:text-obsidian hover:border-obsidian'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Responsive Visual Grid: 4-5 cols desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredWorks.map((work) => {
            const originalIndex = works.findIndex((w) => w.id === work.id);
            const isCurrentlySelected = originalIndex === activeIndex;

            return (
              <motion.div
                key={work.id}
                onClick={() => handleSelectWorkFromThumbnail(work)}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col cursor-pointer"
              >
                {/* Thumbnail Image Card */}
                <div className={`relative aspect-[16/11] rounded-2xl overflow-hidden bg-white border transition-all duration-300 ${
                  isCurrentlySelected
                    ? 'border-2 border-[#84cc16] shadow-lg ring-4 ring-[#84cc16]/20'
                    : 'border-sand/80 group-hover:border-obsidian/50 shadow-xs'
                }`}>
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Highlight overlay for currently selected work */}
                  {isCurrentlySelected && (
                    <div className="absolute inset-0 bg-[#84cc16]/15 pointer-events-none flex items-top justify-end p-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#84cc16] text-obsidian text-[10px] font-extrabold uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Check size={12} strokeWidth={3} />
                        VIEWING
                      </span>
                    </div>
                  )}
                </div>

                {/* Sub-text: Number, Category & Title */}
                <div className="mt-2.5 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold font-mono ${
                      isCurrentlySelected ? 'text-[#84cc16]' : 'text-obsidian/40'
                    }`}>
                      {work.number || (originalIndex + 1 < 10 ? `0${originalIndex + 1}` : originalIndex + 1)}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-obsidian/40 truncate">
                      {work.category}
                    </span>
                  </div>

                  <h5 className={`text-xs sm:text-sm font-bold line-clamp-1 mt-0.5 transition-colors ${
                    isCurrentlySelected ? 'text-obsidian font-extrabold' : 'text-obsidian/80 group-hover:text-obsidian'
                  }`}>
                    {work.title}
                  </h5>

                  {/* Active Green Line Indicator */}
                  {isCurrentlySelected && (
                    <motion.div
                      layoutId="activeWorkHighlightLine"
                      className="h-0.5 w-full bg-[#84cc16] rounded-full mt-2"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 5. PREVIOUS / NEXT BRAND FOOTER NAVIGATION */}
      <div className="border-t border-sand/70 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          to={`/designs/brands/${prevBrand.slug}`}
          className="group flex items-center gap-3 text-left p-4 rounded-2xl border border-sand/60 hover:border-obsidian bg-white/60 hover:bg-white transition-all w-full sm:w-auto"
        >
          <ArrowLeft size={20} className="text-[#84cc16] group-hover:-translate-x-1 transition-transform" />
          <div>
            <span className="block text-[10px] font-bold tracking-widest text-obsidian/40 uppercase">PREVIOUS CLIENT</span>
            <span className="block text-base font-bold text-obsidian uppercase font-heading">{prevBrand.name}</span>
          </div>
        </Link>

        <Link
          to={`/designs/brands/${nextBrand.slug}`}
          className="group flex items-center gap-3 text-right p-4 rounded-2xl border border-sand/60 hover:border-obsidian bg-white/60 hover:bg-white transition-all w-full sm:w-auto justify-end"
        >
          <div>
            <span className="block text-[10px] font-bold tracking-widest text-obsidian/40 uppercase">NEXT CLIENT</span>
            <span className="block text-base font-bold text-obsidian uppercase font-heading">{nextBrand.name}</span>
          </div>
          <ArrowRight size={20} className="text-[#84cc16] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
            <div className="relative max-w-6xl max-h-[90vh] flex flex-col items-center">
              <img
                src={currentWork.image}
                alt={currentWork.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white">
                <span className="text-xs font-mono font-bold text-[#84cc16] uppercase tracking-widest block">
                  {currentWork.category}
                </span>
                <h3 className="text-lg font-bold font-heading mt-1">{currentWork.title}</h3>
                {currentWork.description && <p className="text-xs text-white/70 mt-0.5 font-sans">{currentWork.description}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
