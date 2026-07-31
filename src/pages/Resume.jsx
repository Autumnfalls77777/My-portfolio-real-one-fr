import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, FileText, Loader2 } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';
import { useAdmin } from '@/hooks/useAdmin';

export default function Resume() {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState("Resume");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const admin = useAdmin();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await portfolioApi.entities.ResumeDocument.list();
      setDocuments(docs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await portfolioApi.integrations.Core.UploadFile({ file });
      const existing = documents.find(d => d.type === type);
      if (existing) {
        await portfolioApi.entities.ResumeDocument.update(existing.id, { file_url, title: file.name });
      } else {
        await portfolioApi.entities.ResumeDocument.create({ title: file.name, file_url, type });
      }
      await loadDocuments();
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const activeDoc = documents.find(d => d.type === activeTab);

  return (
    <div className="min-h-screen">
      <section className="relative grid-bg noise-bg flex items-center pt-32 pb-16 px-4 sm:px-6">
        <div className="absolute top-24 left-6 text-[10rem] font-heading font-bold ghost-text select-none pointer-events-none leading-none hidden xl:block">
          Docs
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Documents</p>
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              Resume<br />
              <span className="italic text-obsidian/50">& CV</span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-lime to-indigo rounded-full mt-6" />
            <p className="text-base text-obsidian/60 max-w-xl mt-6 leading-relaxed">
              View and download my professional resume and curriculum vitae.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            {["Resume", "CV"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-obsidian text-ivory shadow-sm"
                    : "bg-white border border-sand text-obsidian/50 hover:text-obsidian hover:bg-white/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={24} className="animate-spin text-obsidian/30" />
            </div>
          ) : activeDoc ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
                <iframe
                  src={activeDoc.file_url}
                  className="w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] border-0"
                  title={activeDoc.title}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                <p className="text-sm text-obsidian/40 truncate max-w-xs">{activeDoc.title}</p>
                <div className="flex gap-3">
                  <a
                    href={activeDoc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal transition-colors"
                  >
                    <Download size={14} /> Download
                  </a>
                  {admin && (
                    <label className="flex items-center gap-2 px-5 py-2.5 text-sm border border-sand rounded-full hover:bg-white/80 cursor-pointer transition-colors">
                      <Upload size={14} /> Replace
                      <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={(e) => handleUpload(e, activeTab)} />
                    </label>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-2 border-dashed border-sand rounded-2xl p-12 sm:p-16 text-center"
            >
              <FileText size={48} className="mx-auto text-obsidian/15 mb-4" />
              <p className="text-lg font-heading text-obsidian/40">No {activeTab} uploaded yet</p>
              {admin ? (
                <>
                  <p className="text-sm text-obsidian/30 mt-2 mb-6">Upload your {activeTab.toLowerCase()} to display it here</p>
                  <label className={`inline-flex items-center gap-2 px-6 py-3 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal cursor-pointer transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? 'Uploading...' : `Upload ${activeTab}`}
                    <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={(e) => handleUpload(e, activeTab)} disabled={uploading} />
                  </label>
                </>
              ) : (
                <p className="text-sm text-obsidian/30 mt-2">Please check back later.</p>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}