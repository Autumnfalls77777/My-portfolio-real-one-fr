import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';
import content from '@/data/content.json';

const fallback = content.testimonials;

export default function Testimonials() {
  const [items, setItems] = useState(fallback);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    portfolioApi.entities.Testimonial.list('order', 100)
      .then(data => { if (data.length > 0) setItems(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-obsidian text-ivory noise-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <Quote size={32} className="mx-auto mb-8 text-ivory/20" />
        </motion.div>

        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute"
            >
              <blockquote className="text-2xl sm:text-3xl font-heading italic leading-relaxed text-ivory/90 mb-8">
                "{items[current].quote}"
              </blockquote>
              <div>
                <p className="text-sm font-semibold text-ivory">{items[current].author}</p>
                <p className="text-xs text-ivory/50 mt-1">{items[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-2 mt-12">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-lime w-6' : 'bg-ivory/20'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}