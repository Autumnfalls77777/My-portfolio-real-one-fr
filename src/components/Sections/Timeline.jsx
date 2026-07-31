import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { portfolioApi } from '@/api/portfolioApi';
import content from '@/data/content.json';

const fallback = content.programming;

export default function Timeline() {
  const ref = useRef(null);
  const [languages, setLanguages] = useState(fallback);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    portfolioApi.entities.Language.list('order', 100)
      .then(data => { if (data.length > 0) setLanguages(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="programming" className="py-32 px-6 noise-bg" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">Technical</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-20">
            Languages &<br />
            <span className="italic text-obsidian/50">frameworks.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-sand">
            <motion.div className="w-full bg-indigo origin-top" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-12">
            {languages.map((lang, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={lang.name + i}
                  className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-ivory border-2 border-indigo z-10 mt-2" />

                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <h3 className="text-xl font-heading font-semibold">{lang.name}</h3>
                    <p className="text-sm text-obsidian/50 mt-1">{lang.experience} · {lang.projects} projects</p>

                    <div className="mt-3 flex items-center gap-3">
                      {isLeft && <span className="text-xs text-obsidian/40 hidden md:inline tabular-nums">{lang.confidence}%</span>}
                      <div className={`flex-1 h-1.5 bg-sand rounded-full overflow-hidden max-w-[200px] ${isLeft ? 'md:ml-auto' : ''}`}>
                        <motion.div
                          className="h-full rounded-full bg-indigo"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.confidence}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                      {!isLeft && <span className="text-xs text-obsidian/40 hidden md:inline tabular-nums">{lang.confidence}%</span>}
                    </div>
                  </div>

                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}