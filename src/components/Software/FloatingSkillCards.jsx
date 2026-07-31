import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Cog, BrainCircuit, Globe, Trophy } from 'lucide-react';

const skills = [
  { name: "Web Dev", icon: Code2, color: "#6366F1", desc: "React · Node · APIs", count: "20+ projects" },
  { name: "App Dev", icon: Smartphone, color: "#BEF32C", desc: "Cross-platform apps", count: "6+ apps built" },
  { name: "Automation", icon: Cog, color: "#F59E0B", desc: "Scripts & pipelines", count: "15+ workflows" },
  { name: "AI & ML", icon: BrainCircuit, color: "#EC4899", desc: "Models & inference", count: "8+ experiments" },
  { name: "Real World Problems", icon: Globe, color: "#10B981", desc: "Impact-driven builds", count: "12+ solutions" },
  { name: "Hackathons", icon: Trophy, color: "#8B5CF6", desc: "Build & ship fast", count: "7+ participated" },
];

const positions = [
  { top: '0%', left: '2%' },
  { top: '8%', left: '52%' },
  { top: '30%', left: '0%' },
  { top: '38%', left: '50%' },
  { top: '60%', left: '4%' },
  { top: '68%', left: '52%' },
];

export default function FloatingSkillCards() {
  return (
    <div className="relative w-full max-w-[400px] h-[460px] ml-auto hidden lg:block">
      {skills.map((skill, i) => {
        const Icon = skill.icon;
        return (
          <motion.div
            key={skill.name}
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
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: skill.color + "15" }}>
                    <Icon size={15} style={{ color: skill.color }} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-obsidian/50">{skill.name}</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
              </div>
              <p className="text-sm font-semibold text-obsidian">{skill.name}</p>
              <p className="text-xs text-obsidian/60 mt-0.5">{skill.desc}</p>
              <div className="flex items-center justify-between mt-2.5">
                <span className="text-[10px] font-mono text-obsidian/50">{skill.count}</span>
                <span className="text-[10px] font-bold" style={{ color: skill.color }}>●</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}