import React from 'react';
import { Calendar, MapPin, BadgeCheck, Briefcase, Lightbulb, Quote } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function ExperienceDetail({ experience, open, onOpenChange }) {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Hero */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-obsidian to-charcoal overflow-hidden">
          {experience.company_logo && (
            <img src={experience.company_logo} alt={experience.company} className="w-full h-full object-cover opacity-50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-ivory/20 backdrop-blur-sm rounded-full text-ivory">
                {experience.role || 'Experience'}
              </span>
              {experience.recommended && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-lime/90 rounded-full text-obsidian">
                  <BadgeCheck size={11} /> Recommended
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-ivory">{experience.title}</h2>
            <p className="text-sm text-ivory/70">{experience.company}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-xs text-obsidian/60">
              <Calendar size={13} className="text-indigo" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Duration</p>
                <p className="font-medium text-obsidian">{experience.duration}</p>
              </div>
            </div>
            {experience.start_date && (
              <div className="flex items-center gap-2 text-xs text-obsidian/60">
                <Briefcase size={13} className="text-indigo" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Started</p>
                  <p className="font-medium text-obsidian">{experience.start_date}</p>
                </div>
              </div>
            )}
            {experience.end_date && (
              <div className="flex items-center gap-2 text-xs text-obsidian/60">
                <Briefcase size={13} className="text-indigo" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Ended</p>
                  <p className="font-medium text-obsidian">{experience.end_date}</p>
                </div>
              </div>
            )}
            {experience.location && (
              <div className="flex items-center gap-2 text-xs text-obsidian/60">
                <MapPin size={13} className="text-indigo" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Location</p>
                  <p className="font-medium text-obsidian">{experience.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {experience.description && (
            <div>
              <h3 className="text-sm uppercase tracking-widest text-obsidian/40 font-medium mb-2">Overview</h3>
              <p className="text-sm text-obsidian/80 leading-relaxed">{experience.description}</p>
            </div>
          )}

          {/* Learnings */}
          {experience.learnings && experience.learnings.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm uppercase tracking-widest text-obsidian/40 font-medium mb-3">
                <Lightbulb size={14} className="text-lime" /> What I Learned
              </h3>
              <ul className="space-y-2">
                {experience.learnings.map((learning, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-obsidian/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo mt-1.5 flex-shrink-0" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {experience.skills && experience.skills.length > 0 && (
            <div>
              <h3 className="text-sm uppercase tracking-widest text-obsidian/40 font-medium mb-3">Skills Gained</h3>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs font-mono bg-sand/40 rounded-full text-obsidian/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendation */}
          {experience.recommended && experience.recommendation_text && (
            <div className="bg-gradient-to-br from-indigo/5 to-lime/5 border border-indigo/10 rounded-2xl p-5">
              <Quote size={24} className="text-indigo/30 mb-2" />
              <p className="text-sm text-obsidian/80 leading-relaxed italic">"{experience.recommendation_text}"</p>
              {experience.recommendation_author && (
                <div className="mt-3 pt-3 border-t border-indigo/10">
                  <p className="text-sm font-medium text-obsidian">{experience.recommendation_author}</p>
                  {experience.recommendation_role && (
                    <p className="text-xs text-obsidian/50">{experience.recommendation_role}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}