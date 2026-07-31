import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Trophy, GraduationCap, GitBranch } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';
import content from '@/data/content.json';

const fallback = content.achievements;

const typeIcons = {
  publication: BookOpen,
  award: Award,
  leadership: Users,
  competition: Trophy,
  certification: GraduationCap,
  contribution: GitBranch,
};

export default function Achievements() {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    portfolioApi.entities.Achievement.list('order', 100)
      .then(data => { if (data.length > 0) setItems(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="achievements" className="py-32 px-6 noise-bg">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Milestones</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-20">
            Achievements &<br />
            <span className="italic text-obsidian/50">recognition.</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {items.map((item, i) => {
            const Icon = typeIcons[item.type] || Award;
            return (
              <motion.div
                key={i}
                className="group grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-4 py-8 border-b border-sand/80 hover:bg-white/30 transition-colors duration-300 px-4 -mx-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-2 pt-1">
                  <span className="text-sm font-mono text-obsidian/40">{item.year}</span>
                  <Icon size={16} className="text-obsidian/30 group-hover:text-indigo transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold group-hover:text-indigo transition-colors duration-300">{item.title}</h3>
                  <p className="text-sm text-obsidian/50 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}