import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 noise-bg" ref={ref}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-bold leading-tight">
            Let's create<br />
            <span className="italic text-obsidian/50">something together.</span>
          </h2>
          <p className="text-base text-obsidian/50 mt-6 max-w-md mx-auto">
            Available for freelance work, collaborations, and full-time opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-charcoal transition-colors duration-300 group"
          >
            Start a Conversation
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 mt-24">
          {about.stats.slice(0, 4).map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border-t border-sand pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-3xl sm:text-4xl font-body font-bold tabular-nums tracking-tight text-obsidian">
                <AnimatedCounter value={stat.value} inView={inView} />
              </p>
              <p className="text-xs text-obsidian/50 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}