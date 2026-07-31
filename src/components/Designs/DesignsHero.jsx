import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import designsData from '@/data/designs.json';
import FloatingToolCards from '@/components/Designs/FloatingToolCards';

const { hero } = designsData;

function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);
  return <span>{count}+</span>;
}

export default function DesignsHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-[55vh] grid-bg noise-bg flex items-center pt-28 pb-10 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-24 left-6 text-[10rem] font-heading font-bold ghost-text select-none pointer-events-none leading-none hidden xl:block">
        Design
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              {hero.title.split(" ")[0]}<br />
              <span className="italic text-obsidian/50">{hero.title.split(" ")[1]}</span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-lime to-indigo rounded-full mt-6" />
            <p className="text-base text-obsidian/60 max-w-xl mt-6 leading-relaxed">
              {hero.intro}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 mt-10" ref={ref}>
              {hero.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="border-t border-sand pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <p className="text-3xl sm:text-4xl font-body font-bold tabular-nums tracking-tight text-obsidian">
                    <AnimatedCounter value={stat.value} inView={inView} />
                  </p>
                  <p className="text-xs text-obsidian/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <FloatingToolCards />
          </div>
        </div>

        <div className="lg:hidden mt-10 flex flex-wrap gap-3 justify-center">
          <div className="p-3 rounded-xl bg-white border border-sand shadow-md">
            <p className="text-xs font-semibold text-obsidian">Photoshop</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-sand shadow-md">
            <p className="text-xs font-semibold text-obsidian">Illustrator</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-sand shadow-md">
            <p className="text-xs font-semibold text-obsidian">Figma</p>
          </div>
        </div>
      </div>
    </section>
  );
}