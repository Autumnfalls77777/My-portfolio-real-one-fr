import React from 'react';
import { X, Calendar, Github, ExternalLink, User, Users, Activity } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

export default function SoftwareDetail({ project, open, onOpenChange }) {
  if (!project) return null;
  const d = project.detail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 bg-ivory border-sand">
        <div className="relative aspect-video sm:aspect-[16/9] overflow-hidden rounded-t-lg bg-obsidian">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-lime rounded-full text-obsidian">
                {project.category}
              </span>
              <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-ivory/20 backdrop-blur-sm rounded-full text-ivory">
                {project.type}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-ivory leading-tight">{project.title}</h2>
          </div>
          <DialogClose className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center hover:bg-ivory transition-colors">
            <X size={16} />
          </DialogClose>
        </div>

        <div className="p-4 sm:p-8 lg:p-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-sand">
            {[
              { icon: Calendar, label: "Completed", value: project.completionDate },
              { icon: Activity, label: "Status", value: project.status },
              { icon: User, label: "Role", value: project.role },
              { icon: Users, label: "Team", value: project.teamProject ? "Team Project" : "Solo" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sand/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={13} className="text-obsidian/40" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-obsidian/30 font-medium">{label}</p>
                  <p className="text-xs sm:text-sm text-obsidian/70 font-medium truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8 sm:mb-10">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-3">Overview</h3>
            <p className="text-sm text-obsidian/60 leading-[1.8]">{d.overview}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/50 border border-sand/40">
              <h3 className="text-sm font-heading font-semibold text-obsidian mb-3">Problem Statement</h3>
              <p className="text-sm text-obsidian/60 leading-[1.8]">{d.problemStatement}</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/50 border border-sand/40">
              <h3 className="text-sm font-heading font-semibold text-obsidian mb-3">Solution</h3>
              <p className="text-sm text-obsidian/60 leading-[1.8]">{d.solution}</p>
            </div>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-8 sm:mb-10">
              <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Screenshots</h3>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                {project.screenshots.map((img, i) => (
                  <div key={i} className="aspect-[16/9] rounded-xl overflow-hidden border border-sand/40">
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 sm:mb-10">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Features</h3>
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-2.5">
              {d.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white/40 border border-sand/40">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" />
                  </span>
                  <p className="text-sm text-obsidian/60 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
            <div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {d.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-white/60 border border-sand/40 rounded-lg text-obsidian/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-3">Architecture</h3>
              <p className="text-sm text-obsidian/60 leading-[1.8]">{d.architecture}</p>
            </div>
          </div>

          <div className="mb-8 sm:mb-10">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Challenges</h3>
            <div className="space-y-2 sm:space-y-2.5">
              {d.challenges.map((c, i) => (
                <div key={i} className="flex gap-3 p-3 sm:p-3.5 rounded-xl bg-white/40 border border-sand/40">
                  <span className="text-indigo font-mono text-xs font-bold mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <p className="text-sm text-obsidian/60 leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 sm:mb-10">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Future Improvements</h3>
            <div className="space-y-2">
              {d.futureImprovements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="text-lime mt-0.5 font-bold">→</span>
                  <p className="text-sm text-obsidian/60 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 sm:mb-10">
            <h3 className="text-base sm:text-lg font-heading font-semibold text-obsidian mb-4">Development Timeline</h3>
            <div className="space-y-1.5">
              {d.developmentTimeline.map((item) => (
                <div key={item.phase} className="flex justify-between items-center py-2.5 px-3 sm:px-4 rounded-xl hover:bg-white/40 transition-colors">
                  <span className="text-sm text-obsidian/60">{item.phase}</span>
                  <span className="text-xs font-mono text-obsidian/40 bg-sand/30 px-2.5 py-1 rounded-lg">{item.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo/5 to-lime/5 border border-indigo/10 mb-8 sm:mb-10">
            <h3 className="text-xs uppercase tracking-[0.2em] text-indigo/60 font-medium mb-3">Personal Notes</h3>
            <p className="text-sm sm:text-base text-obsidian/70 leading-[1.8] italic font-heading">{project.personalNotes}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-sand">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm border border-obsidian/20 rounded-full hover:bg-obsidian hover:text-ivory transition-all duration-300"
            >
              <Github size={15} /> GitHub
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal transition-colors duration-300"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}