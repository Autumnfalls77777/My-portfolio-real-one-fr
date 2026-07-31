import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export default function CertificateCard({ cert, onClick, index }) {
  return (
    <motion.div
      className="group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      <div className="rounded-2xl overflow-hidden bg-white border border-sand hover:border-obsidian/20 transition-all duration-500 shadow-sm hover:shadow-lg">
        <div className="relative bg-sand/20 overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {cert.image_url ? (
            <img
              src={cert.image_url}
              alt={cert.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Award size={40} className="text-obsidian/15" />
            </div>
          )}
          {cert.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-medium bg-lime/90 backdrop-blur-sm rounded-full text-obsidian">
                ★ Featured
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-heading font-semibold text-obsidian group-hover:text-indigo transition-colors duration-300 line-clamp-2">
            {cert.title}
          </h3>
          {cert.issuer && (
            <p className="text-xs text-obsidian/50 mt-1">{cert.issuer}</p>
          )}
          <div className="flex items-center justify-between mt-2">
            {cert.date && <span className="text-[10px] text-obsidian/40">{cert.date}</span>}
            <span className="text-[10px] text-obsidian/40 group-hover:text-indigo transition-colors ml-auto flex items-center gap-1">
              View <ExternalLink size={9} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}