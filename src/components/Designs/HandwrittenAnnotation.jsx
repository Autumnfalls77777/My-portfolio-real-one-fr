import React from 'react';

export default function HandwrittenAnnotation() {
  return (
    <div className="relative inline-flex items-center gap-3 select-none pointer-events-none my-1 z-20">
      {/* Handwritten text */}
      <div className="font-handwritten text-xl sm:text-2xl leading-tight text-obsidian transform -rotate-2">
        <span className="text-[#84cc16] font-bold block">Hover any brand</span>
        <span className="text-obsidian/70 block">to preview</span>
        <span className="text-obsidian/70 block">selected works</span>
      </div>

      {/* Hand-drawn curved arrow pointing down-right */}
      <div className="relative w-14 h-14 -mt-1">
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-obsidian/60 stroke-current"
        >
          {/* Curved path */}
          <path
            d="M10 20 C 35 15, 60 25, 50 60"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead */}
          <path
            d="M40 50 L 50 60 L 60 50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Decorative sparkle star icon - Moved vertically up level with 'brand' */}
      <div className="absolute -top-2 -right-5 text-[#84cc16] animate-pulse">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.3"/>
        </svg>
      </div>
    </div>
  );
}
