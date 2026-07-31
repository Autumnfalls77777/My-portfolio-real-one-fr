import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

export default function OfferCard({ offer, onClick, index }) {
  return (
    <motion.div
      className="group cursor-pointer w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
    >
      <div className="rounded-2xl bg-white border border-sand hover:border-obsidian/20 transition-all duration-500 shadow-sm hover:shadow-lg overflow-hidden flex flex-col h-full">
        <div className="relative bg-sand/10 p-8 flex items-center justify-center border-b border-sand/30" style={{ aspectRatio: '16/10' }}>
          <div className="w-16 h-16 rounded-2xl bg-indigo/5 flex items-center justify-center border border-indigo/10 group-hover:scale-105 transition-transform duration-500">
            <FileText size={32} className="text-indigo" />
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-obsidian group-hover:text-indigo transition-colors duration-300">
              {offer.role}
            </h3>
            <p className="text-sm font-medium text-obsidian/60 mt-1">{offer.company}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-sand/40">
            {offer.date && <span className="text-[11px] font-mono text-obsidian/40">{offer.date}</span>}
            <span className="text-[11px] font-medium text-obsidian/50 group-hover:text-indigo transition-colors flex items-center gap-1">
              View Letter <ExternalLink size={10} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
