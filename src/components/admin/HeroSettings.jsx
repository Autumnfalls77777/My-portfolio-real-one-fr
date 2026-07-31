import React, { useEffect, useState } from 'react';
import { Image, Loader2, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';

export default function HeroSettings() {
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [heroAltText, setHeroAltText] = useState('Prabal — Graphic Designer and Creative Developer');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    portfolioApi.settings.get()
      .then((settings) => {
        setHeroImageUrl(settings.heroImageUrl || '');
        setHeroAltText(settings.heroAltText || 'Prabal — Graphic Designer and Creative Developer');
      })
      .catch((reason) => setError(reason.message || 'Unable to load site settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    setMessage('');
    try {
      const result = await portfolioApi.integrations.Core.UploadFile({
        file,
        folder: 'portfolio/avatars',
        resourceType: 'image',
      });
      setHeroImageUrl(result.file_url);
      setMessage('Photo uploaded. Save the setting to publish it.');
    } catch (reason) {
      setError(reason.message || 'Unable to upload the hero photo');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await portfolioApi.settings.update({
        heroImageUrl: heroImageUrl.trim() || null,
        heroAltText: heroAltText.trim() || null,
      });
      setMessage('Hero photo settings saved.');
    } catch (reason) {
      setError(reason.message || 'Unable to save hero settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-24"><Loader2 size={24} className="animate-spin text-obsidian/30" /></div>;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/10 text-indigo">
          <Image size={22} />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-obsidian/35">Homepage settings</p>
          <h2 className="mt-1 text-3xl font-heading font-bold text-obsidian">Hero photo</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-obsidian/50">Choose the portrait shown in the main hero section. Changes are stored in PostgreSQL and appear on the public site after refresh.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid gap-6 rounded-3xl border border-sand bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-obsidian/50">Photo URL</label>
            <input
              type="url"
              value={heroImageUrl}
              onChange={(event) => setHeroImageUrl(event.target.value)}
              placeholder="https://…"
              className="w-full rounded-xl border border-sand bg-[#F9F8F6] px-4 py-3 text-sm text-obsidian outline-none transition focus:border-indigo focus:ring-2 focus:ring-indigo/10"
            />
            <p className="mt-2 text-xs text-obsidian/35">Paste a permanent HTTPS image URL, or upload through Cloudinary below.</p>
          </div>

          <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand px-4 py-3 text-sm text-obsidian/55 transition hover:border-indigo/40 hover:bg-indigo/[0.03] ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
            {uploading ? <Loader2 size={16} className="animate-spin text-indigo" /> : <Upload size={16} />}
            {uploading ? 'Uploading…' : 'Upload a new hero photo'}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-obsidian/50">Accessible alt text</label>
            <input
              type="text"
              value={heroAltText}
              onChange={(event) => setHeroAltText(event.target.value)}
              maxLength={250}
              className="w-full rounded-xl border border-sand bg-[#F9F8F6] px-4 py-3 text-sm text-obsidian outline-none transition focus:border-indigo focus:ring-2 focus:ring-indigo/10"
            />
          </div>

          {error && <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><AlertCircle size={16} className="mt-0.5 flex-shrink-0" />{error}</div>}
          {message && <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" />{message}</div>}

          <div className="flex justify-end border-t border-sand/70 pt-5">
            <button type="submit" disabled={saving} className="flex items-center gap-2 rounded-xl bg-obsidian px-5 py-3 text-sm font-medium text-ivory shadow-sm transition hover:bg-charcoal disabled:opacity-50">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {saving ? 'Saving…' : 'Save hero settings'}
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-sand bg-[#F9F8F6]">
          <div className="flex aspect-[4/5] items-center justify-center">
            {heroImageUrl ? <img src={heroImageUrl} alt="Hero preview" className="h-full w-full object-cover" /> : <div className="px-6 text-center text-sm text-obsidian/35">Your photo preview will appear here.</div>}
          </div>
          <div className="border-t border-sand bg-white px-4 py-3 text-xs text-obsidian/40">Live preview</div>
        </div>
      </form>
    </div>
  );
}
