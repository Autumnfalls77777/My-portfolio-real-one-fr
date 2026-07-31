import React from 'react';
import { motion } from 'framer-motion';

const tools = [
  { name: "Photoshop", short: "Ps", color: "#31A8FF", bg: "#001E36", desc: "Photo Editing", level: 92 },
  { name: "Illustrator", short: "Ai", color: "#FF9A00", bg: "#330000", desc: "Vector Art", level: 88 },
  { name: "Figma", short: "Fi", color: "#F24E1E", bg: "#1E1E1E", desc: "UI/UX Design", level: 85 },
  { name: "CorelDRAW", short: "Cd", color: "#72B539", bg: "#0F0F0F", desc: "Illustration", level: 75 },
  { name: "Canva", short: "Cv", color: "#00C4CC", bg: "#7D2AE7", desc: "Quick Design", level: 80 },
];

const positions = [
  { top: '2%', left: '2%' },
  { top: '10%', left: '52%' },
  { top: '38%', left: '0%' },
  { top: '46%', left: '50%' },
  { top: '74%', left: '4%' },
];

export default function FloatingToolCards() {
  return (
    <div className="relative w-full max-w-[400px] h-[440px] ml-auto hidden lg:block">
      {tools.map((tool, i) => (
        <motion.div
          key={tool.name}
          className="absolute"
          style={{ top: positions[i].top, left: positions[i].left, width: '185px', willChange: 'transform' }}
          animate={{
            x: [0, 5, 0, -5, 0],
            y: [0, -4, 0, 4, 0],
          }}
          transition={{
            duration: 7 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        >
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.4}
            whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
            className="p-4 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-xl cursor-grab active:cursor-grabbing"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ backgroundColor: tool.bg, color: tool.color }}>
                  {tool.short}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-obsidian/50">{tool.name}</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-obsidian">{tool.name}</p>
            <p className="text-xs text-obsidian/60 mt-0.5">{tool.desc}</p>
            <div className="mt-2.5 h-1 bg-sand/60 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tool.color }}
                initial={{ width: 0 }}
                animate={{ width: `${tool.level}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + i * 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}