import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  { text: 'const portfolio = new App();' },
  { text: 'portfolio.init({ theme: "dark" });' },
  { text: 'await portfolio.deploy();' },
  { text: '// Status: Live ✓' },
];

export default function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) return;
    const timer = setTimeout(() => setVisibleLines(v => v + 1), 800);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="w-[280px] rounded-xl bg-[#1a1a2e]/90 border border-ivory/10 shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-ivory/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 text-[10px] text-ivory/30 font-mono tracking-wider">prabal@dev ~/projects</span>
      </div>
      <div className="p-4 space-y-1.5 min-h-[90px]">
        {codeLines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] font-mono text-ivory/20 w-3 text-right select-none">{i + 1}</span>
            <span className={`text-[11px] font-mono ${i === codeLines.length - 1 ? 'text-lime' : 'text-ivory/70'}`}>
              {line.text}
            </span>
          </motion.div>
        ))}
        {visibleLines < codeLines.length && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-ivory/20 w-3 text-right select-none">{visibleLines + 1}</span>
            <span className="w-2 h-4 bg-lime/60 animate-cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}