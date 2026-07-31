import React from 'react';
import { motion } from 'framer-motion';
import contactData from '@/data/contact.json';

const { hero } = contactData;

export default function ContactHero() {
  return (
    <section className="relative min-h-[45vh] grid-bg noise-bg flex items-center pt-28 pb-8 px-6">
      <div className="absolute top-24 right-6 text-[10rem] font-heading font-bold ghost-text select-none pointer-events-none leading-none hidden xl:block">
        Hello
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tight">
            {hero.title.split(" ").slice(0, 4).join(" ")}<br />
            <span className="italic text-obsidian/50">{hero.title.split(" ").slice(4).join(" ")}</span>
          </h1>
          <p className="text-base text-obsidian/60 max-w-lg mt-8 leading-relaxed">
            {hero.intro}
          </p>
        </motion.div>
      </div>
    </section>
  );
}