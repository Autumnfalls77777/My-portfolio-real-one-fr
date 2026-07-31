import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioApi } from '@/api/portfolioApi';
import content from '@/data/content.json';

const fallbackDev = content.techStack.development;
const fallbackDesign = content.techStack.design;

function TechItem({ item }) {
  return (
    <div className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/20 bg-white/40 backdrop-blur-xl hover:bg-white/60 hover:border-white/40 transition-all duration-300 cursor-grab active:cursor-grabbing flex-shrink-0 w-[160px]">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-mono transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: (item.color || '#6366F1') + "15", color: item.color || '#6366F1' }}
      >
        {item.name.slice(0, 2)}
      </div>
      <span className="text-sm font-medium text-obsidian/80 group-hover:text-obsidian transition-colors">{item.name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse }) {
  const duplicated = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex gap-4 w-max ${reverse ? 'animate-marquee-reverse marquee-pause' : 'animate-marquee marquee-pause'}`}
      >
        {duplicated.map((item, i) => (
          <TechItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const [devTools, setDevTools] = useState(fallbackDev);
  const [designTools, setDesignTools] = useState(fallbackDesign);

  useEffect(() => {
    portfolioApi.entities.TechTool.list('order', 100)
      .then(data => {
        if (data.length > 0) {
          setDevTools(data.filter(t => t.category === 'development'));
          setDesignTools(data.filter(t => t.category === 'design'));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-32 px-6 noise-bg">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Tools</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-16">
            Tech &<br />
            <span className="italic text-obsidian/50">tools.</span>
          </h2>
        </motion.div>

        <div className="space-y-12">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-obsidian/40 font-medium mb-6">Development</p>
            {devTools.length > 0 ? (
              <MarqueeRow items={devTools} />
            ) : (
              <p className="text-sm text-obsidian/30">No tools added yet.</p>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-obsidian/40 font-medium mb-6">Design</p>
            {designTools.length > 0 ? (
              <MarqueeRow items={designTools} reverse />
            ) : (
              <p className="text-sm text-obsidian/30">No tools added yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}