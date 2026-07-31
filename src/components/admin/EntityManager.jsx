import React, { useState, useEffect } from 'react';
import { portfolioApi } from '@/api/portfolioApi';
import { Plus, Pencil, Trash2, Loader2, Upload, GripVertical, X, Save, AlertCircle } from 'lucide-react';
import ProjectSelectionManager from './ProjectSelectionManager';

export default function EntityManager({ entityName, fields, title, subtitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [formError, setFormError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await portfolioApi.entities[entityName].list('order', 100);
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [entityName]);

  const startNew = () => {
    const empty = {};
    fields.forEach(f => {
      if (f.type === 'array') empty[f.key] = [];
      else if (f.type === 'number') empty[f.key] = 0;
      else if (f.type === 'boolean') empty[f.key] = false;
      else empty[f.key] = '';
    });
    empty.order = items.length;
    setFormData(empty);
    setFormError('');
    setEditing('new');
  };

  const startEdit = (item) => {
    setFormData({ ...item });
    setFormError('');
    setEditing(item.id);
  };

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key, value) => {
    const arr = value.split('\n').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [key]: arr }));
  };

  const handleFileUpload = async (key, file) => {
    setUploadingField(key);
    try {
      const folderByEntity = {
        DesignProject: 'portfolio/designs',
        SoftwareProject: 'portfolio/software',
        Certificate: 'portfolio/certificates',
        ResumeDocument: 'portfolio/resumes',
        OfferLetter: 'portfolio/offer-letters',
        ShowcaseItem: 'portfolio/showcase',
        CareerExperience: 'portfolio/avatars',
      };
      const { file_url, media_id } = await portfolioApi.integrations.Core.UploadFile({
        file,
        folder: folderByEntity[entityName] || 'portfolio/gallery',
        resourceType: file.type.startsWith('image/') ? 'image' : 'auto',
      });
      setFormData(prev => ({ ...prev, [key]: file_url, [`${key}_media_id`]: media_id }));
    } catch (e) {
      console.error(e);
      setFormError(e.message || 'Unable to upload this file');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async () => {
    const missing = fields
      .filter(field => field.required)
      .filter(field => {
        const value = formData[field.key];
        return value === undefined || value === null || (typeof value === 'string' && !value.trim());
      });
    if (missing.length > 0) {
      setFormError(`Please complete: ${missing.map(field => field.label).join(', ')}`);
      return;
    }
    setSaving(true);
    setFormError('');
    try {
      const data = { ...formData };
      delete data.id;
      delete data.created_date;
      delete data.updated_date;
      delete data.created_by_id;

      if (editing === 'new') {
        await portfolioApi.entities[entityName].create(data);
      } else {
        await portfolioApi.entities[entityName].update(editing, data);
      }
      setEditing(null);
      await load();
    } catch (e) {
      console.error('[EntityManager save error]', e);
      const isAuthErr = e.status === 401 || e.status === 403 || e.message?.includes('authentication') || e.message?.includes('ADMIN_AUTH_REQUIRED');
      if (isAuthErr) {
        setFormError('Admin session required or expired. Please re-login to Admin Panel.');
      } else {
        setFormError(`[Error ${e.status || 'Save Failed'}] ${e.message || 'Unable to save entry'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      await portfolioApi.entities[entityName].delete(id);
      await load();
    } catch (e) {
      console.error('[EntityManager delete error]', e);
      alert(`[Delete Failed ${e.status || ''}] ${e.message || 'Unable to delete'}`);
    }
  };

  const displayValue = (item, field) => {
    const val = item[field.key];
    if (val === undefined || val === null) return '—';
    if (field.type === 'array') return Array.isArray(val) ? val.join(', ') : String(val);
    if (field.type === 'boolean') return val ? 'Yes' : 'No';
    if (typeof val === 'string' && val.startsWith('http')) return val.slice(0, 40) + '...';
    return String(val);
  };

  const primaryField = fields.find(f => f.required) || fields[0];

  const isSelectableEntity = entityName === 'ShowcaseItem' || entityName === 'FeaturedProject';

  return (
    <div>
      {/* Quick Project Selector from Designs & Software */}
      {isSelectableEntity && (
        <ProjectSelectionManager
          entityName={entityName}
          title={title}
          onSaved={load}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-obsidian">{title}</h2>
          {subtitle && <p className="text-sm text-obsidian/40 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-obsidian text-ivory text-sm font-medium rounded-xl hover:bg-charcoal transition-colors shadow-sm"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {/* Items list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-obsidian/30" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-sand rounded-2xl">
          <p className="text-obsidian/40">No items yet. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="group flex items-center gap-4 p-4 bg-white border border-sand rounded-xl hover:border-obsidian/20 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 text-obsidian/20">
                <GripVertical size={14} />
                <span className="text-xs font-mono">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-obsidian truncate">
                  {item[primaryField.key] || 'Untitled'}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-0.5">
                  {fields.slice(1, 4).map(f => (
                    <span key={f.key} className="text-xs text-obsidian/40">
                      {f.label}: <span className="text-obsidian/60">{displayValue(item, f)}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 rounded-lg hover:bg-sand/40 text-obsidian/40 hover:text-obsidian transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-obsidian/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Inline slide-in form panel ── */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,15,15,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Form header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand/60 bg-obsidian rounded-t-2xl">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/40 font-medium">
                  {editing === 'new' ? 'Creating' : 'Editing'} entry
                </p>
                <h3 className="text-lg font-heading font-bold text-ivory mt-0.5">{title}</h3>
              </div>
              <button
                onClick={() => setEditing(null)}
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-ivory" />
              </button>
            </div>

            {/* Form body */}
            <div className="overflow-y-auto flex-1 px-6 py-6">
              <div className="space-y-5">
                {formError && (
                  <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                    {formError.includes('session') && (
                      <a
                        href="/admin/login"
                        className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold whitespace-nowrap hover:bg-red-700 transition-colors"
                      >
                        Re-login Now
                      </a>
                    )}
                  </div>
                )}
                {fields.map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-obsidian/50 uppercase tracking-widest mb-2">
                      {field.label}
                      {field.required && <span className="text-indigo ml-1">*</span>}
                    </label>

                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={formData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 placeholder:text-obsidian/25 text-obsidian transition-all"
                      />
                    )}

                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={formData[field.key] ?? 0}
                        onChange={e => handleFieldChange(field.key, parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 text-obsidian transition-all"
                      />
                    )}

                    {field.type === 'textarea' && (
                      <textarea
                        value={formData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)}
                        rows={4}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 resize-none placeholder:text-obsidian/25 text-obsidian transition-all"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        value={formData[field.key] || ''}
                        onChange={e => handleFieldChange(field.key, e.target.value)}
                        className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 text-obsidian transition-all cursor-pointer"
                      >
                        <option value="">Select {field.label}...</option>
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    )}

                    {field.type === 'boolean' && (
                      <button
                        type="button"
                        onClick={() => handleFieldChange(field.key, !formData[field.key])}
                        className={`flex items-center gap-3 px-5 py-3 text-sm rounded-xl border-2 transition-all font-medium ${
                          formData[field.key]
                            ? 'bg-indigo/10 border-indigo/40 text-indigo'
                            : 'bg-[#F9F8F6] border-sand text-obsidian/40 hover:border-sand/80'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData[field.key] ? 'bg-indigo border-indigo' : 'bg-white border-obsidian/20'}`}>
                          {formData[field.key] && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        {formData[field.key] ? 'Yes — enabled' : 'No — disabled'}
                      </button>
                    )}

                    {field.type === 'array' && (
                      <div>
                        <textarea
                          value={Array.isArray(formData[field.key]) ? formData[field.key].join('\n') : ''}
                          onChange={e => handleArrayChange(field.key, e.target.value)}
                          rows={4}
                          placeholder="One item per line"
                          className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 resize-none font-mono text-obsidian placeholder:text-obsidian/25 transition-all"
                        />
                        <p className="text-[11px] text-obsidian/30 mt-1.5 pl-1">Add one item per line</p>
                      </div>
                    )}

                    {field.type === 'file' && (
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 px-5 py-3 text-sm border-2 border-dashed border-sand rounded-xl hover:border-indigo/40 hover:bg-indigo/3 cursor-pointer transition-all">
                          {uploadingField === field.key ? (
                            <><Loader2 size={16} className="animate-spin text-indigo" /> <span className="text-obsidian/50">Uploading...</span></>
                          ) : (
                            <><Upload size={16} className="text-obsidian/40" /> <span className="text-obsidian/50">Click to upload file</span></>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            onChange={e => e.target.files[0] && handleFileUpload(field.key, e.target.files[0])}
                          />
                        </label>
                        <input
                          type="url"
                          value={formData[field.key] || ''}
                          onChange={e => handleFieldChange(field.key, e.target.value)}
                          placeholder="Or paste a permanent image/file URL"
                          className="w-full px-4 py-3 text-sm bg-[#F9F8F6] border border-sand rounded-xl outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 text-obsidian transition-all"
                        />
                        {formData[field.key] && (
                          <div className="flex items-center gap-3 p-3 bg-[#F9F8F6] border border-sand rounded-xl">
                            {formData[field.key].match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                              <img src={formData[field.key]} alt="preview" className="w-14 h-14 rounded-lg object-cover border border-sand flex-shrink-0" />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-sand/40 flex items-center justify-center flex-shrink-0 text-xs text-obsidian/40 font-mono">FILE</div>
                            )}
                            <span className="flex-1 min-w-0 text-xs text-obsidian/50 truncate">{formData[field.key]}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-sand/60 bg-[#F9F8F6] rounded-b-2xl">
              <p className="text-xs text-obsidian/30">
                {editing === 'new' ? 'New entry will be added to the list' : 'Changes will be saved immediately'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 text-sm border border-sand rounded-xl hover:bg-sand/30 transition-colors text-obsidian/60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm bg-obsidian text-ivory rounded-xl hover:bg-charcoal transition-colors disabled:opacity-50 font-medium shadow-sm"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {saving ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
