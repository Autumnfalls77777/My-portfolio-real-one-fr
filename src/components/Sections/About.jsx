import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import content from '@/data/content.json';

const { about } = content;

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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 noise-bg" ref={ref}>
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">About</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-16">
            The story<br />
            <span className="italic text-obsidian/50">so far.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Story */}
          <div className="space-y-6">
            {about.story.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-base text-obsidian/70 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-4 border-t border-sand pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <p className="text-3xl sm:text-4xl font-body font-bold tabular-nums tracking-tight text-obsidian leading-none flex-shrink-0">
                  <AnimatedCounter value={stat.value} inView={inView} />
                </p>
                <p className="text-sm text-obsidian/50 leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}