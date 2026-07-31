import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag } from 'lucide-react';

export default function DesignCard({ project, onClick, index }) {
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
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-ivory/90 backdrop-blur-sm rounded-full text-obsidian">
            {project.category}
          </span>
        </div>
        {project.teamProject && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-indigo/90 backdrop-blur-sm rounded-full text-ivory">
              Team
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-heading font-semibold mb-1 text-obsidian group-hover:text-indigo transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-obsidian/80 leading-relaxed line-clamp-2">{project.description}</p>

        <div className="mt-4 pt-4 border-t border-sand/60 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-obsidian/70">
            <Calendar size={11} /> {project.date}
          </div>
          <div className="flex items-center gap-2 text-xs text-obsidian/70">
            <User size={11} /> {project.client}
          </div>
          <div className="flex items-center gap-2 text-xs text-obsidian/70">
            <Tag size={11} /> {project.software.join(", ")}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-sand/40 rounded text-obsidian/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}