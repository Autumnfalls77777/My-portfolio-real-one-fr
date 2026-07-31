import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioApi } from '@/api/portfolioApi';

const PORTRAIT_URL = "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/68052ba26_generated_f264d196.png";

export default function Portrait() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    portfolioApi.settings.get().then(setSettings).catch(() => {});
  }, []);

  const imageUrl = settings?.heroImageUrl || PORTRAIT_URL;
  const altText = settings?.heroAltText || 'Prabal - Graphic Designer and Creative Developer';

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Editorial background elements */}
      <motion.div
        className="absolute -top-8 -left-8 w-64 h-64 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(190,243,44,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 -right-4 w-40 h-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Geometric decorations */}
      <motion.div
        className="absolute top-4 right-8 w-16 h-16 border border-sand rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -left-6 w-8 h-8 bg-lime/20 rounded-sm rotate-45"
        animate={{ rotate: [45, 55, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/2 -left-12 w-24 h-[1px] bg-sand" />
      <div className="absolute top-1/3 -right-8 w-16 h-[1px] bg-sand" />

      {/* Small floating shapes */}
      <motion.div
        className="absolute top-16 left-4 w-3 h-3 rounded-full bg-indigo/20"
        animate={{ y: [0, -12, 0], x: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-12 w-2 h-2 rounded-full bg-lime/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Portrait image */}
      <motion.img
        src={imageUrl}
        alt={altText}
        className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
