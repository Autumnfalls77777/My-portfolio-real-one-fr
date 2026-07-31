import React, { useState, useEffect, useMemo } from 'react';
import { portfolioApi } from '@/api/portfolioApi';
import { Plus, Pencil, Trash2, Loader2, Upload, X, Save, Image as ImageIcon, Layers, AlertCircle, Search } from 'lucide-react';
import { collectionsData as fallbackCollections } from '@/data/brandsData';

export default function DesignProjectStudio() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'collections'
  const [brands, setBrands] = useState([]);
  const [works, setWorks] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit / New Project State
  const [editingBrand, setEditingBrand] = useState(null); // null | 'new' | brand Object
  const [brandForm, setBrandForm] = useState({
    name: '',
    slug: '',
    collectionId: '01',
    year: '2026',
    brandType: 'Brand Identity',
    role: 'Lead Designer',
    overview: '',
    isHot: false,
  });
  const [projectPictures, setProjectPictures] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Collection Edit / New State
  const [editingCollection, setEditingCollection] = useState(null);
  const [collectionForm, setCollectionForm] = useState({ code: '', label: '' });

  const loadData = async () => {
    setLoading(true);
    try {
      const [cardsData, worksData, colsData] = await Promise.all([
        portfolioApi.entities.BrandCard.list('order', 100).catch(() => []),
        portfolioApi.entities.BrandWork.list('order', 300).catch(() => []),
        portfolioApi.entities.DesignCollection.list('order', 50).catch(() => []),
      ]);

      setBrands(cardsData);
      setWorks(worksData);
      setCollections(colsData.length > 0 ? colsData : fallbackCollections.map(c => ({ id: c.id, code: c.id, label: c.label })));
    } catch (err) {
      console.error('[DesignProjectStudio] load error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ── START NEW PROJECT ──
  const startNewProject = () => {
    setBrandForm({
      name: '',
      slug: '',
      collectionId: collections[0]?.code || collections[0]?.id || '01',
      year: new Date().getFullYear().toString(),
      brandType: 'Packaging & Branding',
      role: 'Lead Designer',
      overview: '',
      isHot: false,
    });
    setProjectPictures([
      {
        title: '',
        category: 'PACKAGING',
        year: new Date().getFullYear().toString(),
        imageUrl: '',
        description: '',
      },
    ]);
    setFormError('');
    setEditingBrand('new');
  };

  // ── START EDIT PROJECT ──
  const startEditProject = (brand) => {
    setBrandForm({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      collectionId: brand.collection_id || brand.collectionId || '01',
      year: brand.year || '2026',
      brandType: brand.brand_type || brand.brandType || 'Brand Identity',
      role: brand.role || 'Lead Designer',
      overview: brand.overview || '',
      isHot: Boolean(brand.is_hot || brand.isHot),
    });

    const brandSlug = brand.slug;
    const cardWorks = works.filter(w => w.brand_slug === brandSlug || w.brandSlug === brandSlug);
    const formattedWorks = cardWorks.map(w => ({
      id: w.id,
      title: w.title || '',
      category: w.category || 'PACKAGING',
      year: w.year || brand.year || '2026',
      imageUrl: w.image_url || w.imageUrl || '',
      description: w.description || '',
    }));

    setProjectPictures(formattedWorks.length > 0 ? formattedWorks : [{ title: '', category: 'PACKAGING', year: brand.year || '2026', imageUrl: '', description: '' }]);
    setFormError('');
    setEditingBrand(brand.id);
  };

  // ── ADD NEW PICTURE ROW ──
  const addPictureRow = () => {
    setProjectPictures(prev => [
      ...prev,
      {
        title: '',
        category: 'PACKAGING',
        year: brandForm.year || '2026',
        imageUrl: '',
        description: '',
      },
    ]);
  };

  // ── REMOVE PICTURE ROW ──
  const removePictureRow = (idx) => {
    setProjectPictures(prev => prev.filter((_, i) => i !== idx));
  };

  // ── PICTURE FIELD CHANGE ──
  const handlePictureChange = (idx, field, value) => {
    setProjectPictures(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  // ── FILE UPLOAD FOR PICTURE ──
  const handlePictureUpload = (idx, file) => {
    if (!file) return;
    setUploadingIdx(idx);

    // Instant local preview via FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (dataUrl) {
        handlePictureChange(idx, 'imageUrl', dataUrl);
      }
    };
    reader.readAsDataURL(file);

    // Attempt background server/Cloudinary upload if available
    portfolioApi.integrations.Core.UploadFile({
      file,
      folder: 'portfolio/designs',
      resourceType: 'image',
    }).then(res => {
      if (res?.file_url) {
        handlePictureChange(idx, 'imageUrl', res.file_url);
      }
    }).catch(err => {
      console.warn('[Cloudinary upload skipped, using instant Data URL]', err.message);
    }).finally(() => {
      setUploadingIdx(null);
    });
  };

  // ── SAVE BRAND & WORKS TO DATABASE ──
  const handleSaveProject = async () => {
    if (!brandForm.name.trim()) {
      setFormError('Project Title is required');
      return;
    }

    const validPictures = projectPictures.filter(p => (p.imageUrl || '').trim() || (p.title || '').trim());

    setSaving(true);
    setFormError('');

    try {
      const slug = brandForm.slug.trim() || brandForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const brandPayload = {
        name: brandForm.name,
        slug,
        collectionId: brandForm.collectionId,
        year: brandForm.year,
        worksCount: validPictures.length,
        brandType: brandForm.brandType,
        role: brandForm.role,
        overview: brandForm.overview,
        isHot: brandForm.isHot,
        status: 'PUBLISHED',
      };

      // 1. Create or Update BrandCard
      if (editingBrand === 'new') {
        await portfolioApi.entities.BrandCard.create(brandPayload);
      } else {
        await portfolioApi.entities.BrandCard.update(editingBrand, brandPayload);
      }

      // 2. Sync BrandWorks to SQLite Database
      for (let i = 0; i < validPictures.length; i++) {
        const pic = validPictures[i];
        const workPayload = {
          brandSlug: slug,
          title: pic.title || `${brandForm.name} Item ${i + 1}`,
          description: pic.description || '',
          category: (pic.category || 'PACKAGING').toUpperCase(),
          year: pic.year || brandForm.year,
          imageUrl: pic.imageUrl,
          order: i,
          status: 'PUBLISHED',
        };

        if (pic.id) {
          await portfolioApi.entities.BrandWork.update(pic.id, workPayload).catch(() =>
            portfolioApi.entities.BrandWork.create(workPayload)
          );
        } else {
          await portfolioApi.entities.BrandWork.create(workPayload);
        }
      }

      setEditingBrand(null);
      await loadData();
    } catch (err) {
      console.error('[Save Project Error]', err);
      setFormError(`[Save Failed ${err.status || ''}] ${err.message || 'Unable to save project'}`);
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE PROJECT ──
  const handleDeleteProject = async (brand) => {
    if (!window.confirm(`Delete "${brand.name}" and all its artworks? This cannot be undone.`)) return;
    try {
      const cardWorks = works.filter(w => w.brand_slug === brand.slug || w.brandSlug === brand.slug);
      for (const work of cardWorks) {
        if (work.id) {
          await portfolioApi.entities.BrandWork.delete(work.id).catch(() => {});
        }
      }
      await portfolioApi.entities.BrandCard.delete(brand.id);
      await loadData();
    } catch (err) {
      alert('Delete failed: ' + (err.message || 'Error deleting project'));
    }
  };

  // ── SAVE COLLECTION ──
  const handleSaveCollection = async () => {
    if (!collectionForm.code.trim() || !collectionForm.label.trim()) {
      alert('Please enter both Code (e.g. 06) and Label (e.g. MOTION)');
      return;
    }
    try {
      if (editingCollection === 'new') {
        await portfolioApi.entities.DesignCollection.create({
          code: collectionForm.code.trim(),
          label: collectionForm.label.trim().toUpperCase(),
          order: collections.length + 1,
          status: 'PUBLISHED',
        });
      } else {
        await portfolioApi.entities.DesignCollection.update(editingCollection, {
          code: collectionForm.code.trim(),
          label: collectionForm.label.trim().toUpperCase(),
        });
      }
      setEditingCollection(null);
      await loadData();
    } catch (err) {
      alert('Error saving collection: ' + (err.message || 'Failed'));
    }
  };

  // ── DELETE COLLECTION ──
  const handleDeleteCollection = async (colId) => {
    if (!window.confirm('Delete this collection?')) return;
    try {
      await portfolioApi.entities.DesignCollection.delete(colId);
      await loadData();
    } catch (err) {
      alert('Error deleting collection: ' + err.message);
    }
  };

  // Derived filtered list for search
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands;
    const q = searchQuery.toLowerCase();
    return brands.filter(b =>
      b.name?.toLowerCase().includes(q) ||
      (b.brand_type || b.brandType || '').toLowerCase().includes(q) ||
      (b.collection_id || b.collectionId || '').includes(q) ||
      (b.overview || '').toLowerCase().includes(q)
    );
  }, [brands, searchQuery]);

  return (
    <div>
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-sand/60">
        <div className="flex items-center gap-2 bg-[#F0ECE6] p-1.5 rounded-2xl border border-sand/60 w-fit">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'projects'
                ? 'bg-obsidian text-white shadow-sm'
                : 'text-obsidian/60 hover:text-obsidian'
            }`}
          >
            <ImageIcon size={14} />
            <span>Design Projects ({brands.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'collections'
                ? 'bg-obsidian text-white shadow-sm'
                : 'text-obsidian/60 hover:text-obsidian'
            }`}
          >
            <Layers size={14} />
            <span>Collections ({collections.length})</span>
          </button>
        </div>

        {activeTab === 'projects' ? (
          <button
            onClick={startNewProject}
            className="flex items-center gap-2 px-5 py-2.5 bg-obsidian text-white text-xs font-bold rounded-xl hover:bg-charcoal transition-all shadow-md uppercase tracking-wider w-fit"
          >
            <Plus size={16} /> Add Design Project
          </button>
        ) : (
          <button
            onClick={() => {
              setCollectionForm({ code: String(collections.length + 1).padStart(2, '0'), label: '' });
              setEditingCollection('new');
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-obsidian text-white text-xs font-bold rounded-xl hover:bg-charcoal transition-all shadow-md uppercase tracking-wider w-fit"
          >
            <Plus size={16} /> Add Collection
          </button>
        )}
      </div>

      {/* Search bar - only on projects tab */}
      {activeTab === 'projects' && (
        <div className="mb-6 relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-obsidian/30" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, type, collection..."
            className="w-full pl-11 pr-5 py-3 text-sm bg-white border border-sand/80 rounded-2xl outline-none focus:border-obsidian/40 focus:ring-2 focus:ring-obsidian/5 placeholder:text-obsidian/30 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-obsidian/30 hover:text-obsidian"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}

      {/* ── PROJECTS VIEW ── */}
      {activeTab === 'projects' && (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={24} className="animate-spin text-obsidian/30" />
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-sand rounded-2xl">
              {searchQuery ? (
                <>
                  <p className="text-obsidian/40 text-sm">No projects match "{searchQuery}".</p>
                  <button onClick={() => setSearchQuery('')} className="mt-4 px-4 py-2 bg-obsidian text-white text-xs font-bold rounded-xl">
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <p className="text-obsidian/40 text-sm">No design projects found in database.</p>
                  <button onClick={startNewProject} className="mt-4 px-4 py-2 bg-obsidian text-white text-xs font-bold rounded-xl">
                    Create First Project
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredBrands.map((brand, i) => {
                const cardWorks = works.filter(w => w.brand_slug === brand.slug || w.brandSlug === brand.slug);
                const firstPic = cardWorks[0]?.image_url || cardWorks[0]?.imageUrl || '';
                const colLabel = collections.find(c => (c.code || c.id) === (brand.collection_id || brand.collectionId))?.label || brand.collection_id || '01';

                return (
                  <div
                    key={brand.id || i}
                    className="bg-white border border-sand/80 rounded-2xl p-5 hover:border-obsidian/30 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Preview strip */}
                      <div className="w-full h-40 rounded-xl bg-sand/30 overflow-hidden mb-4 relative">
                        {firstPic ? (
                          <img src={firstPic} alt={brand.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-obsidian/20 font-mono text-xs">NO PICTURES</div>
                        )}
                        <span className="absolute top-3 left-3 px-3 py-1 bg-obsidian/80 backdrop-blur-md text-white text-[10px] font-mono font-bold rounded-full uppercase">
                          Col {brand.collection_id || brand.collectionId || '01'} • {colLabel}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-obsidian tracking-wide uppercase truncate">{brand.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-obsidian/50 mt-1 font-mono">
                        <span>{cardWorks.length} Pictures</span>
                        <span>•</span>
                        <span>{brand.brand_type || brand.brandType || 'Branding'}</span>
                        <span>•</span>
                        <span>{brand.year || '2026'}</span>
                      </div>

                      {brand.overview && (
                        <p className="text-xs text-obsidian/60 mt-3 line-clamp-2 leading-relaxed">{brand.overview}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-sand/40">
                      <button
                        onClick={() => startEditProject(brand)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sand/40 text-obsidian/70 hover:bg-obsidian hover:text-white transition-colors text-xs font-medium"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(brand)}
                        className="p-1.5 rounded-lg text-obsidian/30 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── COLLECTIONS VIEW ── */}
      {activeTab === 'collections' && (
        <div className="max-w-2xl space-y-3">
          <p className="text-xs text-obsidian/50 mb-4">
            Manage section categories shown in the left vertical rail on the <code className="bg-sand/40 px-1 py-0.5 rounded font-mono">/designs</code> page.
          </p>
          {collections.map((col, idx) => (
            <div key={col.id || idx} className="flex items-center justify-between p-4 bg-white border border-sand/80 rounded-xl">
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-lg bg-obsidian text-white flex items-center justify-center font-mono text-xs font-bold">
                  {col.code || col.id}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-obsidian tracking-wider font-mono">{col.label}</h4>
                  <p className="text-[11px] text-obsidian/40">Code: {col.code || col.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCollectionForm({ code: col.code || col.id, label: col.label });
                    setEditingCollection(col.id || col.code);
                  }}
                  className="p-2 rounded-lg text-obsidian/40 hover:text-obsidian hover:bg-sand/30"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDeleteCollection(col.id || col.code)}
                  className="p-2 rounded-lg text-obsidian/30 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PROJECT EDIT/CREATE MODAL ── */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,15,15,0.6)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-sand/60 bg-obsidian text-white rounded-t-3xl">
              <div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
                  {editingBrand === 'new' ? 'Creating New' : 'Editing'} Design Project
                </p>
                <h3 className="text-lg font-heading font-bold mt-0.5">{brandForm.name || 'Untitled Project'}</h3>
              </div>
              <button
                onClick={() => setEditingBrand(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-8 py-6 space-y-8">
              {formError && (
                <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* ── SECTION 1: PROJECT DETAILS ── */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-obsidian/40 border-b border-sand/60 pb-2">
                  1. General Info
                </h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
                      Title <span className="text-indigo-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={brandForm.name}
                      onChange={e => setBrandForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. MEJWANI MASALE"
                      className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">
                      Collection <span className="text-indigo-600">*</span>
                    </label>
                    <select
                      value={brandForm.collectionId}
                      onChange={e => setBrandForm(prev => ({ ...prev, collectionId: e.target.value }))}
                      className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 cursor-pointer font-mono font-bold"
                    >
                      {collections.map(c => (
                        <option key={c.code || c.id} value={c.code || c.id}>
                          {c.code || c.id} — {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">Year</label>
                    <input
                      type="text"
                      value={brandForm.year}
                      onChange={e => setBrandForm(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="2026"
                      className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">Tag / Type</label>
                    <input
                      type="text"
                      value={brandForm.brandType}
                      onChange={e => setBrandForm(prev => ({ ...prev, brandType: e.target.value }))}
                      placeholder="e.g. Packaging & Branding"
                      className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">Your Role</label>
                    <input
                      type="text"
                      value={brandForm.role}
                      onChange={e => setBrandForm(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Lead Designer"
                      className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-obsidian/60 uppercase tracking-wider mb-2">Description / Overview</label>
                  <textarea
                    value={brandForm.overview}
                    onChange={e => setBrandForm(prev => ({ ...prev, overview: e.target.value }))}
                    rows={3}
                    placeholder="Brief description of the project..."
                    className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-obsidian resize-none"
                  />
                </div>
              </div>

              {/* ── SECTION 2: PICTURES (ARTWORKS) ── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-sand/60 pb-2">
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-widest text-obsidian/40">
                      2. Project Pictures ({projectPictures.length})
                    </h4>
                    <p className="text-[11px] text-obsidian/40 mt-0.5">
                      Add images one by one with their own description to fit the artwork viewer.
                    </p>
                  </div>
                  <button
                    onClick={addPictureRow}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian text-white text-xs font-bold rounded-lg hover:bg-charcoal transition-colors uppercase tracking-wider"
                  >
                    <Plus size={14} /> Add Picture
                  </button>
                </div>

                <div className="space-y-6">
                  {projectPictures.map((pic, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-[#FAF8F5] border border-sand/80 rounded-2xl relative space-y-4 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-sand/40 pb-3">
                        <span className="text-xs font-mono font-bold text-obsidian/60 uppercase">
                          Picture #{idx + 1}
                        </span>
                        {projectPictures.length > 1 && (
                          <button
                            onClick={() => removePictureRow(idx)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-obsidian/50 uppercase mb-1">Picture Title</label>
                          <input
                            type="text"
                            value={pic.title}
                            onChange={e => handlePictureChange(idx, 'title', e.target.value)}
                            placeholder="e.g. Chicken Masala Red Series Pouch"
                            className="w-full px-3 py-2 text-xs bg-white border border-sand rounded-lg outline-none focus:border-obsidian"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-obsidian/50 uppercase mb-1">Category / Tag</label>
                          <input
                            type="text"
                            value={pic.category}
                            onChange={e => handlePictureChange(idx, 'category', e.target.value)}
                            placeholder="e.g. PACKAGING"
                            className="w-full px-3 py-2 text-xs bg-white border border-sand rounded-lg outline-none focus:border-obsidian font-mono uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-obsidian/50 uppercase mb-1">Year</label>
                          <input
                            type="text"
                            value={pic.year}
                            onChange={e => handlePictureChange(idx, 'year', e.target.value)}
                            placeholder="2026"
                            className="w-full px-3 py-2 text-xs bg-white border border-sand rounded-lg outline-none focus:border-obsidian font-mono"
                          />
                        </div>
                      </div>

                      {/* Image Upload / URL */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-[11px] font-semibold text-obsidian/50 uppercase">Artwork Image Source</label>
                          <span className="text-[10px] text-obsidian/40 font-mono">Supports Cloudinary Links & Local Uploads</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-sand rounded-lg text-xs cursor-pointer hover:border-obsidian transition-colors shrink-0">
                            {uploadingIdx === idx ? (
                              <><Loader2 size={14} className="animate-spin text-obsidian" /> <span>Uploading...</span></>
                            ) : (
                              <><Upload size={14} className="text-obsidian/50" /> <span>Upload Local File</span></>
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                  handlePictureUpload(idx, e.target.files[0]);
                                  e.target.value = '';
                                }
                              }}
                            />
                          </label>
                          <input
                            type="url"
                            value={pic.imageUrl}
                            onChange={e => handlePictureChange(idx, 'imageUrl', e.target.value)}
                            placeholder="Paste Cloudinary link (https://res.cloudinary.com/...) or direct image URL"
                            className="flex-1 px-3 py-2 text-xs bg-white border border-sand rounded-lg outline-none focus:border-obsidian font-mono"
                          />
                        </div>

                        {pic.imageUrl && (
                          <div className="mt-3 flex items-center justify-between gap-3 p-2.5 bg-white border border-sand rounded-xl">
                            <div className="flex items-center gap-3 min-w-0">
                              <img src={pic.imageUrl} alt="preview" className="w-12 h-12 rounded-lg object-cover border border-sand flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="block text-[11px] font-mono text-obsidian/70 truncate">{pic.imageUrl}</span>
                                <span className="text-[10px] font-mono font-bold text-[#84cc16] uppercase">
                                  {pic.imageUrl.includes('cloudinary.com') ? '☁️ Cloudinary Hosted Link' : pic.imageUrl.startsWith('data:') ? '📁 Local File Preview' : '🌐 Direct Web Image'}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePictureChange(idx, 'imageUrl', '')}
                              className="text-xs text-obsidian/40 hover:text-red-600 px-2 py-1"
                            >
                              Clear
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Picture Description */}
                      <div>
                        <label className="block text-[11px] font-semibold text-obsidian/50 uppercase mb-1">Picture Description</label>
                        <textarea
                          value={pic.description}
                          onChange={e => handlePictureChange(idx, 'description', e.target.value)}
                          rows={2}
                          placeholder="e.g. Matte foil finish pouch with custom dish photography and gold foil emblem."
                          className="w-full px-3 py-2 text-xs bg-white border border-sand rounded-lg outline-none focus:border-obsidian resize-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-8 py-4 border-t border-sand/60 bg-[#FAF8F5] rounded-b-3xl">
              <p className="text-xs text-obsidian/40">
                All pictures and descriptions will be saved to your SQLite database.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setEditingBrand(null)}
                  className="px-5 py-2.5 text-xs font-bold border border-sand rounded-xl hover:bg-sand/30 transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProject}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-obsidian text-white text-xs font-bold rounded-xl hover:bg-charcoal transition-all disabled:opacity-50 uppercase tracking-wider shadow-md"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saving ? 'Saving to Database...' : 'Save Design Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COLLECTION EDIT/CREATE MODAL ── */}
      {editingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-obsidian">
              {editingCollection === 'new' ? 'Add New Collection' : 'Modify Collection'}
            </h3>
            <div>
              <label className="block text-xs font-bold uppercase text-obsidian/40 mb-1">Collection Code (e.g. 06)</label>
              <input
                type="text"
                value={collectionForm.code}
                onChange={e => setCollectionForm(prev => ({ ...prev, code: e.target.value }))}
                placeholder="06"
                className="w-full px-3 py-2 text-sm border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-obsidian/40 mb-1">Collection Label (e.g. MOTION)</label>
              <input
                type="text"
                value={collectionForm.label}
                onChange={e => setCollectionForm(prev => ({ ...prev, label: e.target.value }))}
                placeholder="MOTION"
                className="w-full px-3 py-2 text-sm border rounded-xl font-mono uppercase"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditingCollection(null)} className="px-4 py-2 text-xs font-bold text-obsidian/60">
                Cancel
              </button>
              <button onClick={handleSaveCollection} className="px-5 py-2 bg-obsidian text-white text-xs font-bold rounded-xl">
                Save Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
