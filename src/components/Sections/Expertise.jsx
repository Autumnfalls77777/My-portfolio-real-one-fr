import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Package, Fingerprint, Layout, Share2, Code, Server, Brain } from 'lucide-react';
import content from '@/data/content.json';

const iconMap = { Palette, Package, Fingerprint, Layout, Share2, Code, Server, Brain };
const { expertise } = content;

export default function Expertise() {
  return (
    <section id="expertise" className="py-32 px-6">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-4">What I Do</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-16">
            Areas of<br />
            <span className="italic text-obsidian/50">expertise.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {expertise.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                className="group relative p-6 rounded-2xl border border-sand/80 bg-white/30 backdrop-blur-sm hover:bg-white/60 hover:border-sand transition-all duration-500 cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-xl bg-ivory flex items-center justify-center mb-4 border border-sand/50 group-hover:border-indigo/30 group-hover:bg-indigo/5 transition-colors duration-300">
                  <Icon size={18} className="text-obsidian/60 group-hover:text-indigo transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-obsidian/50 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}