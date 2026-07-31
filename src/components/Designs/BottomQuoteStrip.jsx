import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Warm brown palette matching the arrow/accent color
const BG = '#C49A6C';          // warm brown card background
const QUOTE_MARK = '#F5ECD7';  // off-white quote mark
const TEXT = '#FAF4EC';        // off-white body text
const AUTHOR = '#F0E4CC';      // slightly muted off-white for attribution
const BTN_BG = 'rgba(255,255,255,0.15)';
const BTN_BORDER = 'rgba(255,255,255,0.25)';
const BTN_HOVER_BG = 'rgba(255,255,255,0.22)';

export default function BottomQuoteStrip() {
  return (
    <div
      className="w-full rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mt-14 sm:mt-20"
      style={{ backgroundColor: BG }}
    >
      {/* Subtle inner highlight top-left */}
      <div
        className="absolute top-0 left-0 w-[340px] h-[220px] rounded-full blur-[100px] pointer-events-none"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
      />
      {/* Subtle darker vignette bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[200px] rounded-full blur-[90px] pointer-events-none"
        style={{ backgroundColor: 'rgba(0,0,0,0.10)' }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12">
        {/* Quote Left Section */}
        <div className="flex items-start gap-6 sm:gap-8 max-w-4xl">
          {/* Oversized quotation mark */}
          <span
            className="font-serif text-6xl sm:text-8xl font-bold leading-none select-none shrink-0 -mt-2 sm:-mt-4"
            style={{ color: QUOTE_MARK, opacity: 0.85 }}
          >
            "
          </span>

          <div>
            <blockquote
              className="font-body text-lg sm:text-2xl font-normal leading-snug tracking-tight"
              style={{ color: TEXT }}
            >
              Design is not just what it looks like and feels like.
              <br className="hidden sm:inline" />
              {' '}Design is how it works.
            </blockquote>
            <p className="mt-4 text-base font-semibold tracking-wide" style={{ color: AUTHOR }}>
              — Steve Jobs
            </p>
          </div>
        </div>

        {/* View All Works pill button */}
        <Link
          to="/designs/grid"
          className="group px-8 py-4 rounded-full flex items-center gap-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase whitespace-nowrap self-start md:self-auto transition-all duration-300"
          style={{
            color: TEXT,
            backgroundColor: BTN_BG,
            border: `1.5px solid ${BTN_BORDER}`,
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = BTN_HOVER_BG}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = BTN_BG}
        >
          <span>VIEW ALL WORKS</span>
          <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" style={{ color: TEXT }} />
        </Link>
      </div>
    </div>
  );
}
