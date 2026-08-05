import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ACCENT = '#C49A6C';

export default function BrandArtworkCollage({ brand }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const stripRef = useRef(null);

  // Reset to first work whenever the brand changes
  useEffect(() => {
    setActiveIdx(0);
  }, [brand?.slug]);

  if (!brand) return null;

  const works = brand.allWorks && brand.allWorks.length > 0
    ? brand.allWorks
    : [{
        id: `${brand.id || brand.slug}-fb`,
        number: '01',
        title: `${brand.name} — Visual Identity`,
        category: brand.stats?.categories?.[0] || 'BRAND IDENTITY',
        year: brand.year || '2026',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
        description: `Core visual system and design deliverables for ${brand.name}.`,
      }];

  const total = works.length;
  const current = works[activeIdx] || works[0];
  const pad = (n) => String(n).padStart(2, '0');

  const go = (dir) => {
    const next = (activeIdx + dir + total) % total;
    setActiveIdx(next);
    if (stripRef.current) {
      const child = stripRef.current.children[next];
      child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    // key=brand.slug forces a full remount when brand changes — eliminates stale image flicker
    <div key={brand.slug} className="w-full flex flex-col gap-5">

      {/* ══ MAIN VIEWER CARD ══ */}
      <div
        className="w-full rounded-2xl border overflow-hidden"
        style={{ backgroundColor: '#FAF7F2', borderColor: '#EDE4D6' }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: '#EDE4D6' }}
        >
          <span
            className="text-xs font-bold tracking-[0.22em] uppercase font-mono"
            style={{ color: '#9A8878' }}
          >
            {brand.name}
          </span>

          <div className="flex items-center gap-2.5">
            <span
              className="px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase border"
              style={{ borderColor: '#D5C4AE', color: '#8A7060', backgroundColor: 'transparent' }}
            >
              {current.category}
            </span>
            <span
              className="text-[11px] font-mono font-bold"
              style={{ color: '#A09080' }}
            >
              {pad(activeIdx + 1)} / {pad(total)}
            </span>
          </div>
        </div>

        {/* Image row */}
        <div className="flex items-center justify-between px-6 py-8 sm:py-12 gap-4">
          {/* Left arrow */}
          <button
            onClick={() => go(-1)}
            disabled={total <= 1}
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border bg-white flex items-center justify-center transition-all duration-250 shadow-sm ${
              total > 1 ? 'cursor-pointer hover:shadow-md hover:border-obsidian/30' : 'opacity-20 cursor-default'
            }`}
            style={{ borderColor: '#DDD2C2' }}
          >
            <ChevronLeft size={22} className="stroke-[1.5]" style={{ color: '#6A5A4A' }} />
          </button>

          {/* Artwork */}
          <div className="flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[300px] md:min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${brand.slug}-${activeIdx}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full flex items-center justify-center"
              >
                <img
                  src={current.image || current.image_url}
                  alt={current.title}
                  className="max-w-full max-h-[260px] sm:max-h-[340px] md:max-h-[400px] object-contain drop-shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => go(1)}
            disabled={total <= 1}
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border bg-white flex items-center justify-center transition-all duration-250 shadow-sm ${
              total > 1 ? 'cursor-pointer hover:shadow-md hover:border-obsidian/30' : 'opacity-20 cursor-default'
            }`}
            style={{ borderColor: '#DDD2C2' }}
          >
            <ChevronRight size={22} className="stroke-[1.5]" style={{ color: '#6A5A4A' }} />
          </button>
        </div>

        {/* Bottom info bar */}
        <div
          className="flex items-start justify-between gap-6 px-6 py-4 border-t border-b"
          style={{ borderColor: '#EDE4D6', backgroundColor: '#F7F2EB' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${brand.slug}-${activeIdx}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="min-w-0 flex-1"
            >
              <h4 className="text-sm sm:text-base font-bold text-obsidian leading-snug">
                {current.title}
              </h4>
              {current.description && (
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#A09080' }}>
                  {current.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <span
            className="text-[11px] font-mono font-bold flex-shrink-0 uppercase tracking-wider pt-0.5"
            style={{ color: '#A09080' }}
          >
            YEAR: {current.year || brand.year || '2026'}
          </span>
        </div>

        {/* Embedded Thumbnail Grid - Wraps photos into clean rows below */}
        <div className="px-5 sm:px-6 py-4 bg-[#FAF4ED] border-t border-[#EDE4D6]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-obsidian/40">
              ARTWORK GALLERY ({total} WORKS)
            </span>
            <span className="text-[10px] font-mono text-obsidian/40">
              Click photo to select
            </span>
          </div>

          <div
            ref={stripRef}
            className="flex flex-wrap gap-2.5 max-h-[220px] overflow-y-auto pr-1 brown-scrollbar"
          >
            {works.map((work, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={work.id || idx}
                  onClick={() => setActiveIdx(idx)}
                  className="relative flex-shrink-0 w-20 h-14 sm:w-22 sm:h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 group"
                  style={{
                    border: isActive ? `3px solid ${ACCENT}` : '2px solid #E5DCCE',
                    boxShadow: isActive
                      ? `0 0 0 3px ${ACCENT}44, 0 2px 8px rgba(196,154,108,0.30)`
                      : '0 1px 3px rgba(0,0,0,0.06)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    background: 'white',
                  }}
                >
                  <img
                    src={work.image || work.image_url}
                    alt={work.title}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                  />
                  <span
                    className={`absolute bottom-1 right-1 px-1.5 py-0.5 text-[9px] font-mono font-bold rounded ${
                      isActive ? 'bg-[#C49A6C] text-white' : 'bg-black/60 text-white/90'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
