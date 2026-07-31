import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, BadgeCheck, ArrowRight } from 'lucide-react';

export default function ExperienceCard({ experience, onClick, index }) {
  return (
    <motion.div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-sand hover:border-obsidian/20 transition-all duration-500 shadow-sm hover:shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      <div className="relative h-32 bg-gradient-to-br from-obsidian to-charcoal overflow-hidden flex items-center justify-center">
        {experience.company_logo ? (
          <img
            src={experience.company_logo}
            alt={experience.company}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          />
        ) : (
          <Building2 size={40} className="text-ivory/30" />
        )}
        {experience.recommended && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium bg-lime/90 backdrop-blur-sm rounded-full text-obsidian">
              <BadgeCheck size={11} /> Recommended
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-heading font-semibold mb-1 text-obsidian group-hover:text-indigo transition-colors duration-300">
          {experience.title}
        </h3>
        <p className="text-sm text-obsidian/70 font-medium mb-3">{experience.company}</p>
        <p className="text-sm text-obsidian/60 leading-relaxed line-clamp-2">{experience.description}</p>

        <div className="mt-4 pt-4 border-t border-sand/60 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-obsidian/60">
            <Calendar size={11} /> {experience.duration}
          </div>
          {experience.location && (
            <div className="flex items-center gap-2 text-xs text-obsidian/60">
              <MapPin size={11} /> {experience.location}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          {experience.skills && experience.skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {experience.skills.slice(0, 2).map((skill) => (
                <span key={skill} className="px-2 py-0.5 text-[10px] font-mono bg-sand/40 rounded text-obsidian/60">
                  {skill}
                </span>
              ))}
              {experience.skills.length > 2 && (
                <span className="px-2 py-0.5 text-[10px] font-mono text-obsidian/40">
                  +{experience.skills.length - 2}
                </span>
              )}
            </div>
          )}
          <span className="text-[10px] text-obsidian/40 group-hover:text-indigo transition-colors ml-auto flex items-center gap-1">
            View details <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}