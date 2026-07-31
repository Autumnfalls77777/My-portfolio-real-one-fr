import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Github, ExternalLink, User } from 'lucide-react';

const statusColors = {
  "Live": "bg-green-400",
  "Open Source": "bg-lime",
  "In Progress": "bg-amber-400",
  "Archived": "bg-obsidian/30",
};

export default function SoftwareCard({ project, onClick, index }) {
  return (
    <motion.div
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-sand hover:border-obsidian/20 transition-all duration-500 shadow-sm hover:shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 2) * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-obsidian">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-ivory/90 backdrop-blur-sm rounded-full text-obsidian">
            {project.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${statusColors[project.status] || "bg-obsidian/30"}`} />
          <span className="text-[10px] text-ivory/80 font-medium">{project.status}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-heading font-semibold text-ivory group-hover:text-lime transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-ivory/60 mt-1">{project.type}</p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-obsidian/80 leading-relaxed line-clamp-2">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-mono bg-sand/40 rounded text-obsidian/70">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-obsidian/50">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-sand/60 grid grid-cols-2 gap-2 text-xs text-obsidian/70">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} /> {project.completionDate}
          </div>
          <div className="flex items-center gap-1.5">
            <User size={11} /> {project.role.split("&")[0].trim()}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-obsidian/70 hover:text-obsidian transition-colors"
          >
            <Github size={13} /> Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-obsidian/70 hover:text-indigo transition-colors"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
          <span className="ml-auto text-[10px] text-obsidian/50 group-hover:text-indigo transition-colors">
            View details →
          </span>
        </div>
      </div>
    </motion.div>
  );
}