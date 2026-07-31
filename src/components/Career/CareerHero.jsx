import React from 'react';
import { motion } from 'framer-motion';

export default function CareerHero() {
  return (
    <section className="relative min-h-[50vh] grid-bg noise-bg flex items-center pt-28 pb-10 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-24 left-6 text-[10rem] font-heading font-bold ghost-text select-none pointer-events-none leading-none hidden xl:block">
        Work
      </div>
      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Journey</p>
          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
            Career &<br />
            <span className="italic text-obsidian/50">experience.</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-lime to-indigo rounded-full mt-6" />
          <p className="text-base text-obsidian/60 max-w-xl mt-6 leading-relaxed">
            Internships, part-time roles, and professional milestones — the real-world experiences that shaped my craft.
          </p>
        </motion.div>
      </div>
    </section>
  );
}