import React from 'react';
import { Folder, Image as ImageIcon, Calendar, Tag } from 'lucide-react';

export default function BrandStatsBar({ brand }) {
  if (!brand || !brand.stats) return null;

  const { projects, designs, duration, categories } = brand.stats;

  return (
    <div className="w-full bg-white border border-sand/80 rounded-2xl p-4 sm:p-5 shadow-sm mt-4">
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr] gap-4 sm:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-sand/60">

        {/* 1. Projects Count */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 lg:px-3">
          <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] flex-shrink-0 shadow-xs">
            <Folder size={18} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xl font-bold text-obsidian leading-none">
              {projects}
            </p>
            <p className="text-[10px] font-bold tracking-widest text-obsidian/50 uppercase mt-1">
              PROJECTS
            </p>
          </div>
        </div>

        {/* 2. Designs Count */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 lg:px-3">
          <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] flex-shrink-0 shadow-xs">
            <ImageIcon size={18} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-xl font-bold text-obsidian leading-none">
              {designs}
            </p>
            <p className="text-[10px] font-bold tracking-widest text-obsidian/50 uppercase mt-1">
              DESIGNS
            </p>
          </div>
        </div>

        {/* 3. Duration */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 lg:px-3">
          <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] flex-shrink-0 shadow-xs">
            <Calendar size={18} strokeWidth={1.75} />
          </div>
          <div>
            <p className="text-sm sm:text-base font-bold text-obsidian leading-none whitespace-nowrap">
              {duration}
            </p>
            <p className="text-[10px] font-bold tracking-widest text-obsidian/50 uppercase mt-1">
              DURATION
            </p>
          </div>
        </div>

        {/* 4. Categories Tag */}
        <div className="flex items-center gap-3 pt-2 lg:pt-0 lg:px-4 col-span-2 lg:col-span-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-ivory border border-sand/70 flex items-center justify-center text-[#84cc16] flex-shrink-0 shadow-xs">
            <Tag size={18} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] sm:text-xs font-bold text-obsidian uppercase tracking-tight leading-tight">
              {categories ? categories.join(', ') : 'PACKAGING, SOCIAL MEDIA, BRANDING, CAMPAIGNS'}
            </p>
            <p className="text-[10px] font-bold tracking-widest text-obsidian/50 uppercase mt-1">
              CATEGORIES
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
