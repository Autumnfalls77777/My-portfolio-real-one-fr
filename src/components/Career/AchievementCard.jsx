import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';

const typeColors = {
  publication: 'bg-indigo/10 text-indigo',
  award: 'bg-lime/20 text-obsidian',
  leadership: 'bg-amber-100 text-amber-700',
  competition: 'bg-red-100 text-red-600',
  certification: 'bg-blue-100 text-blue-600',
  contribution: 'bg-green-100 text-green-600',
};

export default function AchievementCard({ achievement, index }) {
  return (
    <motion.div
      className="group rounded-2xl overflow-hidden bg-white border border-sand hover:border-obsidian/20 transition-all duration-500 shadow-sm hover:shadow-md p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-obsidian to-charcoal flex items-center justify-center flex-shrink-0">
          <Trophy size={20} className="text-lime" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-heading font-semibold text-obsidian group-hover:text-indigo transition-colors duration-300">
            {achievement.title}
          </h3>
          {achievement.description && (
            <p className="text-sm text-obsidian/60 leading-relaxed mt-1.5 line-clamp-3">{achievement.description}</p>
          )}
          <div className="flex items-center gap-3 mt-3">
            {achievement.type && (
              <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium rounded-full ${typeColors[achievement.type] || 'bg-sand/40 text-obsidian/60'}`}>
                {achievement.type}
              </span>
            )}
            {achievement.year && (
              <span className="flex items-center gap-1 text-xs text-obsidian/40">
                <Calendar size={11} /> {achievement.year}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}