import React, { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collectionsData } from '@/data/brandsData';
import LeftCollectionRail from './LeftCollectionRail';
import BrandArchiveList from './BrandArchiveList';
import BrandArtworkCollage from './BrandArtworkCollage';
import BottomQuoteStrip from './BottomQuoteStrip';
import { portfolioApi } from '@/api/portfolioApi';

const ACCENT = '#C49A6C';

export default function BrandArchiveSection() {
  const [activeCollection, setActiveCollection] = useState('01');
  const [collections, setCollections] = useState(collectionsData);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    // Load Collections, Brand Cards & Works directly from SQLite database backend
    Promise.all([
      portfolioApi.entities.DesignCollection.list('order', 50).catch(() => []),
      portfolioApi.entities.BrandCard.list('order', 100).catch(() => []),
      portfolioApi.entities.BrandWork.list('order', 300).catch(() => [])
    ]).then(([cols, cards, works]) => {
      if (cols && cols.length > 0) {
        const sortedCols = [...cols].sort((a, b) => (a.code || a.id).localeCompare(b.code || b.id));
        setCollections(sortedCols.map(c => ({ id: c.code, code: c.code, label: c.label })));
      }
      if (cards) {
        const merged = cards.map(c => {
          const brandSlug = c.slug;
          const cardWorks = works.filter(w => w.brand_slug === brandSlug || w.brandSlug === brandSlug);
          const mappedWorks = cardWorks.map((w, idx) => ({
            id: w.id || `bw-${brandSlug}-${idx}`,
            number: String(idx + 1).padStart(2, '0'),
            title: w.title,
            category: w.category || 'BRANDING',
            year: w.year || c.year || '2026',
            image: w.image_url || w.imageUrl || '',
            description: w.description || '',
          }));

          return {
            id: c.id || c.slug,
            slug: c.slug,
            name: c.name,
            type: c.brand_type || c.brandType || 'Brand Identity',
            year: c.year || '2026',
            worksCount: mappedWorks.length || c.works_count || c.worksCount || 0,
            collectionId: c.collection_id || c.collectionId || '01',
            isHot: Boolean(c.is_hot || c.isHot),
            overview: c.overview || '',
            role: c.role || '',
            stats: { categories: Array.from(new Set(mappedWorks.map(w => w.category).filter(Boolean))) },
            allWorks: mappedWorks,
          };
        });

        setAllBrands(merged);
        const firstInCol = merged.find(b => (b.collectionId || b.collection_id) === activeCollection) || merged[0];
        if (firstInCol) setSelectedBrand(firstInCol);
      }
    });
  }, []);

  const displayBrands = allBrands.filter((b) => b.collectionId === activeCollection);
  const currentCollection = collectionsData.find((c) => c.id === activeCollection);
  const totalWorks = displayBrands.reduce((acc, b) => acc + (b.worksCount || 0), 0);

  const handleSelectCollection = (id) => {
    setActiveCollection(id);
    const first = allBrands.find((b) => b.collectionId === id);
    if (first) setSelectedBrand(first);
  };

  return (
    <section className="relative py-8 sm:py-12 px-5 sm:px-8 max-w-[1440px] mx-auto w-full">

      {/* ── ARCHIVE HEADER BAR ── */}
      <div
        className="flex items-center justify-between border-b pb-5 mb-10"
        style={{ borderColor: '#E8E2D8' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}99` }}
          />
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.22em] text-obsidian uppercase font-body">
            ARCHIVE / {currentCollection?.label || 'BRANDS'}
          </h2>
          <span className="text-obsidian/20 font-light px-1">|</span>
          <span
            className="text-xs sm:text-sm font-bold tracking-wider uppercase font-mono"
            style={{ color: '#A09080' }}
          >
            {displayBrands.length} ITEMS ({totalWorks} WORKS)
          </span>
        </div>

        <Link
          to="/designs/grid"
          className="group flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:bg-obsidian hover:text-white hover:border-obsidian"
          style={{ borderColor: '#DDD4C4', color: '#6A5A4A', backgroundColor: 'transparent' }}
        >
          <span>GRID VIEW</span>
          <LayoutGrid size={14} />
        </Link>
      </div>

      {/* ── 3-COLUMN EDITORIAL ARCHIVE LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr_1.6fr] gap-8 xl:gap-12 items-start">
        {/* COL 1: Vertical Collections Rail */}
        <div className="hidden lg:block sticky top-24">
          <LeftCollectionRail
            activeCollection={activeCollection}
            onSelectCollection={handleSelectCollection}
            collections={collections}
          />
        </div>

        {/* Mobile Collection selector tabs */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {collectionsData.map(col => (
            <button
              key={col.id}
              onClick={() => handleSelectCollection(col.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCollection === col.id
                  ? 'bg-obsidian text-white'
                  : 'bg-white border text-obsidian/60 hover:text-obsidian'
              }`}
              style={{ borderColor: '#DDD4C4' }}
            >
              {col.id} {col.label}
            </button>
          ))}
        </div>

        {/* COL 2: Brand Archive List */}
        <div className="w-full">
          <BrandArchiveList
            brands={displayBrands}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
          />
        </div>

        {/* COL 3: Brand Artwork Collage & Viewer */}
        <div className="w-full sticky top-24">
          <BrandArtworkCollage brand={selectedBrand} />
        </div>
      </div>

      {/* ── BOTTOM QUOTE STRIP ── */}
      <BottomQuoteStrip />
    </section>
  );
}
