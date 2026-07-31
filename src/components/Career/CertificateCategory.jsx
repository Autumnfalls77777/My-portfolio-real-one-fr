import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import CertificateCard from '@/components/Career/CertificateCard';

const INITIAL_COUNT = 4;
const LOAD_COUNT = 4;

export default function CertificateCategory({ title, certificates, onCardClick }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [certificates]);

  const visible = certificates.slice(0, visibleCount);
  const hasMore = visibleCount < certificates.length;
  const isHorizontal = certificates.length > INITIAL_COUNT;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + LOAD_COUNT);
        }
      },
      { rootMargin: '150px' }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-obsidian">{title}</h3>
          <p className="text-xs text-obsidian/40 mt-0.5">{certificates.length} certificate{certificates.length !== 1 ? 's' : ''}</p>
        </div>
        {isHorizontal && (
          <div className="flex gap-1.5">
            <button
              onClick={() => scroll(-1)}
              className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:bg-sand/30 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-8 h-8 rounded-full border border-sand flex items-center justify-center text-obsidian/40 hover:text-obsidian hover:bg-sand/30 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1"
      >
        {visible.map((cert, i) => (
          <CertificateCard
            key={cert.id || i}
            cert={cert}
            index={i}
            onClick={() => onCardClick(cert)}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + LOAD_COUNT)}
            className="text-xs text-indigo hover:text-indigo/70 transition-colors font-medium"
          >
            Load more ({certificates.length - visibleCount} remaining)
          </button>
          <Loader2 size={12} className="text-obsidian/20" />
        </div>
      )}
    </div>
  );
}