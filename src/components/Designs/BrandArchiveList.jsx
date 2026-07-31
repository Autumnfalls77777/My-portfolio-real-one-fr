import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const ACCENT = '#C49A6C';

function getInitials(name) {
  const words = name.replace(/[^a-zA-Z ]/g, '').trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + (words[1]?.[0] || '')).toUpperCase();
}

export default function BrandArchiveList({ brands, selectedBrand, onSelectBrand }) {
  const scrollRef = useRef(null);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState(null); // purely visual, doesn't select

  const VISIBLE_LIMIT = 6;
  const hasMore = brands.length > VISIBLE_LIMIT;

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 8);
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setHoveredSlug(null);
    setCanScrollDown(false);

    // Use ResizeObserver so we get notified after the browser finishes layout
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => checkScroll());
    ro.observe(el);
    // Also call immediately and after a short paint delay
    checkScroll();
    const t = requestAnimationFrame(() => checkScroll());
    return () => { ro.disconnect(); cancelAnimationFrame(t); };
  }, [brands]);

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 260, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative">
      {/* Scrollable brand list */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          maxHeight: hasMore ? '520px' : undefined,
          overflowY: hasMore ? 'auto' : 'visible',
        }}
        className="w-full flex flex-col pr-1.5 brown-scrollbar"
      >
        {brands.map((brand, idx) => {
          const isSelected = selectedBrand?.slug === brand.slug;
          const isHovered = hoveredSlug === brand.slug && !isSelected;
          const initials = getInitials(brand.name);

          return (
            <motion.div
              key={`${brand.slug}-${brand.collectionId}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: idx * 0.02 }}
              // Hover = visual highlight only, NO selection
              onMouseEnter={() => setHoveredSlug(brand.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              // Click = actually select
              onClick={() => onSelectBrand(brand)}
              className="cursor-pointer transition-all duration-200 mx-1 my-1 rounded-2xl px-4 py-4 flex items-center justify-between gap-4"
              style={
                isSelected
                  ? { backgroundColor: '#FAF6F1', border: '1.5px solid #E8DECE', boxShadow: '0 2px 10px rgba(196,154,108,0.10)' }
                  : isHovered
                  ? { backgroundColor: '#FBF7F2', border: '1.5px solid #EDE4D6' }
                  : { backgroundColor: 'transparent', border: '1.5px solid transparent' }
              }
            >
              {/* Avatar + Name + Meta */}
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black tracking-wide border-2 bg-white shadow-sm"
                  style={{
                    borderColor: isSelected ? ACCENT : isHovered ? '#D5C4AE' : '#E5E2DA',
                    color: isSelected ? ACCENT : isHovered ? '#8A7060' : '#A09080',
                  }}
                >
                  {initials}
                </div>

                <div className="min-w-0">
                  <h3
                    className="text-sm sm:text-[15px] font-bold tracking-wide uppercase truncate"
                    style={{ color: isSelected ? '#1a1a1a' : isHovered ? '#2a2a2a' : '#6a6a6a' }}
                  >
                    {brand.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-semibold tracking-wider" style={{ color: '#A09080' }}>
                      {brand.worksCount || brand.works_count || 0} WORKS
                    </span>
                    <span className="text-[11px]" style={{ color: '#C5B8A8' }}>•</span>
                    <span className="text-[11px] font-mono" style={{ color: '#A09080' }}>
                      {brand.year}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={
                    isSelected
                      ? { backgroundColor: ACCENT }
                      : isHovered
                      ? { backgroundColor: '#EDE4D6', border: '1px solid #D5C4AE' }
                      : { border: '1px solid #E5E2DA', color: '#C5B8A8' }
                  }
                >
                  <ArrowRight
                    size={15}
                    style={{ color: isSelected ? '#fff' : isHovered ? '#8A7060' : '#C5B8A8' }}
                    className="stroke-[2]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll indicator — only shown when more content below */}
      {hasMore && canScrollDown && (
        <div className="pt-3 pb-1 flex flex-col items-center justify-center gap-1.5">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              y: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
            }}
            onClick={scrollDown}
            className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-obsidian text-white border-2 border-[#C49A6C] shadow-lg shadow-obsidian/25 cursor-pointer hover:bg-[#C49A6C] hover:border-[#C49A6C] transition-all duration-300"
            aria-label="Scroll down"
          >
            <motion.span
              className="absolute -inset-1.5 rounded-full border-2 border-obsidian/40 pointer-events-none"
              animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
            />
            <ChevronDown size={18} className="stroke-[2.5] text-white transition-transform duration-300 group-hover:translate-y-0.5" />
          </motion.button>
          <span className="text-[10px] font-bold tracking-[0.2em] text-obsidian/70 uppercase">
            Scroll down
          </span>
        </div>
      )}
    </div>
  );
}
