import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Coffee, FolderOpen } from 'lucide-react';

const widgetConfigs = {
  currentProject: { icon: FolderOpen, label: "Current Project" },
  codingStreak: { icon: Flame, label: "Coding Streak" },
  coffeeCounter: { icon: Coffee, label: "Fuel Level" },
};

export default function Widget({ type, data, className = "", style = {} }) {
  const config = widgetConfigs[type];
  const Icon = config.icon;

  return (
    <div
      className={`px-4 py-3 rounded-xl bg-white/90 border border-sand/80 shadow-md w-[180px] select-none ${className}`}
      style={style}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={12} className="text-indigo" />
        <span className="text-[9px] uppercase tracking-[0.15em] text-obsidian/40 font-medium">{config.label}</span>
      </div>
      {type === "currentProject" && (
        <>
          <p className="text-sm font-semibold">{data.name}</p>
          <div className="mt-1.5 h-1 bg-sand rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${data.progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
          <p className="text-[10px] text-obsidian/40 mt-1">{data.progress}% complete</p>
        </>
      )}
      {type === "codingStreak" && (
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-heading font-bold text-obsidian">{data.days}</span>
          <span className="text-xs text-obsidian/50">{data.label}</span>
        </div>
      )}
      {type === "coffeeCounter" && (
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-heading font-bold text-obsidian">{data.count}</span>
          <span className="text-xs text-obsidian/50">{data.label}</span>
        </div>
      )}
    </div>
  );
}