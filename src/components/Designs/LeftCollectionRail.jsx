import React from 'react';
import { collectionsData as fallbackCollections } from '@/data/brandsData';

const ACCENT = '#C49A6C';

export default function LeftCollectionRail({ activeCollection, onSelectCollection, collections = fallbackCollections }) {
  const rawItems = collections && collections.length > 0 ? collections : fallbackCollections;
  const items = [...rawItems].sort((a, b) => (a.code || a.id).localeCompare(b.code || b.id));

  return (
    <aside className="w-full flex flex-row lg:flex-col items-start gap-2 lg:gap-0 relative">
      {/* COLLECTIONS vertical label */}
      <div
        className="hidden lg:flex flex-col items-center gap-0 absolute -left-6 top-0"
        style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
      >
        <span className="text-[9px] font-extrabold tracking-[0.35em] text-obsidian/40 uppercase font-body">
          COLLECTIONS
        </span>
      </div>

      {/* Collection items */}
      <nav className="flex flex-row lg:flex-col w-full gap-2 lg:gap-0 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 pl-1 lg:pl-0">
        {items.map((item) => {
          const code = item.code || item.id;
          const label = item.label;
          const isActive = activeCollection === code;

          return (
            <button
              key={code}
              onClick={() => onSelectCollection(code)}
              className={`group relative text-left transition-all duration-300 cursor-pointer flex-shrink-0 lg:flex-shrink py-2.5 lg:py-4 px-3.5 lg:px-0 lg:pl-6 rounded-xl lg:rounded-none ${
                isActive ? 'bg-[#FAF6F1] lg:bg-transparent border border-[#E8DECE] lg:border-none shadow-sm lg:shadow-none' : 'hover:bg-black/5 lg:hover:bg-transparent'
              }`}
            >
              {/* Active left accent bar */}
              {isActive && (
                <span
                  className="hidden lg:block absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                  style={{ backgroundColor: ACCENT }}
                />
              )}

              <div className="flex items-center lg:block gap-2">
                <span
                  className="block font-heading font-light leading-none transition-colors duration-300 text-xl lg:text-3xl xl:text-4xl"
                  style={{ color: isActive ? ACCENT : undefined }}
                >
                  <span className={isActive ? '' : 'text-obsidian/40 group-hover:text-obsidian/70'}>
                    {code}
                  </span>
                </span>
                <span
                  className="block text-[10px] lg:text-[11px] font-bold tracking-[0.18em] lg:mt-1 uppercase transition-colors duration-300"
                  style={{ color: isActive ? ACCENT : undefined }}
                >
                  <span className={isActive ? '' : 'text-obsidian/40 group-hover:text-obsidian/60'}>
                    {label}
                  </span>
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
