import React, { useState } from 'react';
import { X, Calendar, User, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

export default function DesignDetail({ project, open, onOpenChange }) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  if (!project) return null;
  const d = project.detail;
  const gallery = project.gallery || [];

  const prevImage = () => setGalleryIndex(i => (i - 1 + gallery.length) % gallery.length);
  const nextImage = () => setGalleryIndex(i => (i + 1) % gallery.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-hidden p-0 gap-0 bg-ivory border-0 shadow-2xl rounded-2xl">
        {/* Close button */}
        <DialogClose className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-obsidian/80 backdrop-blur-sm flex items-center justify-center hover:bg-obsidian transition-colors">
          <X size={15} className="text-ivory" />
        </DialogClose>

        <div className="flex flex-col lg:flex-row h-full max-h-[92vh]">
          {/* LEFT — Dark sidebar with hero image + meta */}
          <div className="lg:w-[340px] flex-shrink-0 bg-obsidian flex flex-col">
            {/* Hero image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 overflow-hidden">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-semibold bg-lime rounded-full text-obsidian">
                    {project.category}
                  </span>
                  {project.teamProject && (
                    <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-white/10 backdrop-blur-sm rounded-full text-ivory/80">
                      Team
                    </span>
                  )}
                </div>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-ivory leading-tight">{project.title}</h2>
              </div>
            </div>

            {/* Meta info */}
            <div className="p-6 space-y-4 border-t border-white/10">
              {[
                { icon: Calendar, label: 'Date', value: project.date },
                { icon: User, label: 'Client', value: project.client },
                { icon: Users, label: 'Team', value: project.teamProject ? 'Team Project' : 'Solo' },
                { icon: Sparkles, label: 'Tools', value: (project.software || []).join(', ') },
              ].map(({ icon: Icon, label, value }) => value ? (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={13} className="text-ivory/50" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-ivory/30 font-medium">{label}</p>
                    <p className="text-sm text-ivory/80 font-medium mt-0.5">{value}</p>
                  </div>
                </div>
              ) : null)}
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="px-6 pb-6 flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-mono bg-white/10 rounded-lg text-ivory/40">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 sm:p-8 space-y-8">

              {/* Overview */}
              {d.overview && (
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Overview</h3>
                  <p className="text-sm text-obsidian/70 leading-[1.9]">{d.overview}</p>
                </section>
              )}

              {/* Gallery Carousel */}
              {gallery.length > 0 && (
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Gallery</h3>
                  <div className="relative rounded-xl overflow-hidden bg-sand/20 border border-sand/40">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryIndex}
                        src={gallery[galleryIndex]}
                        alt={`${project.title} ${galleryIndex + 1}`}
                        className="w-full aspect-video object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    {gallery.length > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian/60 backdrop-blur-sm flex items-center justify-center hover:bg-obsidian transition-colors">
                          <ChevronLeft size={16} className="text-ivory" />
                        </button>
                        <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian/60 backdrop-blur-sm flex items-center justify-center hover:bg-obsidian transition-colors">
                          <ChevronRight size={16} className="text-ivory" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {gallery.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setGalleryIndex(i)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${i === galleryIndex ? 'w-6 bg-obsidian' : 'w-1.5 bg-obsidian/30'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {/* Thumbnail strip */}
                  {gallery.length > 1 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setGalleryIndex(i)}
                          className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === galleryIndex ? 'border-obsidian' : 'border-transparent opacity-50 hover:opacity-75'}`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Challenges */}
              {d.challenges && d.challenges.length > 0 && (
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Challenges</h3>
                  <div className="space-y-2">
                    {d.challenges.map((c, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl bg-white border border-sand/60">
                        <span className="text-indigo font-mono text-xs font-bold mt-0.5 flex-shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                        <p className="text-sm text-obsidian/65 leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Design Process */}
              {d.process && d.process.length > 0 && (
                <section>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Design Process</h3>
                  <div className="space-y-0">
                    {d.process.map((step, i) => (
                      <div key={i} className="flex gap-4 items-start py-3 border-b border-sand/40 last:border-0">
                        <div className="w-6 h-6 rounded-full bg-indigo/10 border border-indigo/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-mono font-bold text-indigo">{i + 1}</span>
                        </div>
                        <p className="text-sm text-obsidian/65 leading-relaxed pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Color Palette + Typography — 2 col */}
              {((d.colorPalette && d.colorPalette.length > 0) || (d.typography && d.typography.length > 0)) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {d.colorPalette && d.colorPalette.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Color Palette</h3>
                      <div className="flex flex-wrap gap-3">
                        {d.colorPalette.map(color => (
                          <div key={color.hex} className="text-center">
                            <div className="w-12 h-12 rounded-xl border border-sand/40 shadow-sm" style={{ backgroundColor: color.hex }} />
                            <p className="text-[10px] text-obsidian/50 mt-1.5 font-medium">{color.name}</p>
                            <p className="text-[9px] font-mono text-obsidian/30">{color.hex}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  {d.typography && d.typography.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Typography</h3>
                      <div className="space-y-2">
                        {d.typography.map(font => (
                          <div key={font.name} className="p-3 rounded-xl bg-white border border-sand/60">
                            <p className="text-sm font-heading font-semibold text-obsidian">{font.name}</p>
                            <p className="text-xs text-obsidian/40 mt-0.5">{font.usage}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Tools + Timeline — 2 col */}
              {((d.tools && d.tools.length > 0) || (d.timeline && d.timeline.length > 0)) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {d.tools && d.tools.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {d.tools.map(tool => (
                          <span key={tool} className="px-3 py-1.5 text-xs font-mono bg-white border border-sand/60 rounded-lg text-obsidian/60">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                  {d.timeline && d.timeline.length > 0 && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Timeline</h3>
                      <div className="space-y-1">
                        {d.timeline.map(item => (
                          <div key={item.phase} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-sand/20 transition-colors">
                            <span className="text-sm text-obsidian/60">{item.phase}</span>
                            <span className="text-xs font-mono text-obsidian/40 bg-sand/30 px-2 py-0.5 rounded">{item.duration}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}

              {/* Personal Note */}
              {project.personalNote && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo/8 to-lime/8 border border-indigo/15">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-indigo/50 font-semibold mb-2">Personal Note</h3>
                  <p className="text-sm text-obsidian/70 leading-[1.9] italic font-heading">{project.personalNote}</p>
                </div>
              )}

              {/* Learnings + Notes */}
              {(d.learnings || d.notes) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {d.learnings && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">My Learnings</h3>
                      <p className="text-sm text-obsidian/60 leading-[1.8]">{d.learnings}</p>
                    </section>
                  )}
                  {d.notes && (
                    <section>
                      <h3 className="text-xs uppercase tracking-[0.2em] text-obsidian/30 font-semibold mb-3">Additional Notes</h3>
                      <p className="text-sm text-obsidian/60 leading-[1.8]">{d.notes}</p>
                    </section>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}