import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Save, RotateCcw, Check } from 'lucide-react';
import Portrait from '@/components/Hero/Portrait';
import APICard from '@/components/Hero/APICard';
import Widget from '@/components/Hero/Widget';
import content from '@/data/content.json';
import { isAdmin } from '@/lib/adminAuth';
import { portfolioApi } from '@/api/portfolioApi';

const { hero, apiCards, widgets } = content;

const DEFAULT_POSITIONS = {
  spotify: { x: 0, y: 0 },
  discord: { x: 0, y: 0 },
  currentProject: { x: 0, y: 0 },
  github: { x: 0, y: 0 },
  steam: { x: 0, y: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const getInitialPositions = () => {
  try {
    const localSaved = localStorage.getItem('portfolio_card_positions');
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      if (parsed && typeof parsed === 'object') {
        return { ...DEFAULT_POSITIONS, ...parsed };
      }
    }
  } catch (e) {}
  return DEFAULT_POSITIONS;
};

export default function HeroSection() {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [positions, setPositions] = useState(getInitialPositions);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAdminUser(isAdmin());

    // Sync saved positions from server backend
    portfolioApi.settings.get()
      .then((settings) => {
        if (settings?.cardPositions) {
          try {
            const parsed = typeof settings.cardPositions === 'string'
              ? JSON.parse(settings.cardPositions)
              : settings.cardPositions;
            if (parsed && typeof parsed === 'object') {
              const updated = { ...DEFAULT_POSITIONS, ...parsed };
              setPositions(updated);
              localStorage.setItem('portfolio_card_positions', JSON.stringify(updated));
            }
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, []);

  const handleDragEnd = (key, info) => {
    const offsetX = Math.round(info.offset.x);
    const offsetY = Math.round(info.offset.y);

    if (offsetX === 0 && offsetY === 0) return;

    setPositions((prev) => {
      const current = prev[key] || { x: 0, y: 0 };
      const updated = {
        ...prev,
        [key]: {
          x: current.x + offsetX,
          y: current.y + offsetY,
        },
      };
      try {
        localStorage.setItem('portfolio_card_positions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    if (isAdminUser) {
      setHasUnsavedChanges(true);
    }
  };

  const handleSavePositions = async () => {
    setIsSaving(true);
    setToastMessage('');
    try {
      localStorage.setItem('portfolio_card_positions', JSON.stringify(positions));
      await portfolioApi.settings.update({
        cardPositions: JSON.stringify(positions),
      });
      setHasUnsavedChanges(false);
      setToastMessage('Card positions saved permanently!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.warn('[HeroSection] Save warning:', err.message);
      setHasUnsavedChanges(false);
      setToastMessage('Card positions saved locally!');
      setTimeout(() => setToastMessage(''), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPositions = async () => {
    setPositions(DEFAULT_POSITIONS);
    localStorage.removeItem('portfolio_card_positions');
    setHasUnsavedChanges(false);
    try {
      await portfolioApi.settings.update({
        cardPositions: JSON.stringify(DEFAULT_POSITIONS),
      });
    } catch (e) {}
    setToastMessage('Card positions reset to default!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <section id="home" className="relative min-h-screen grid-bg noise-bg overflow-hidden">
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-28 pb-16 lg:pt-32">
        {/* Ghost text */}
        <div className="absolute top-20 left-6 text-[12rem] font-heading font-bold ghost-text select-none pointer-events-none leading-none hidden xl:block">
          Design
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">
          {/* Left: Portrait + Text */}
          <div className="relative order-2 lg:order-1">
            <div className="lg:hidden mb-12">
              <Portrait />
            </div>

            <div className="space-y-2">
              <motion.p
                className="text-lg text-obsidian/50 font-body"
                variants={fadeUp} initial="hidden" animate="visible" custom={0}
              >
                {hero.greeting}
              </motion.p>
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold leading-[1.05] tracking-tight"
                variants={fadeUp} initial="hidden" animate="visible" custom={1}
              >
                {hero.name}
              </motion.h1>
              <div className="space-y-0 pt-2">
                {hero.roles.map((role, i) => (
                  <motion.p
                    key={role}
                    className={`font-heading italic ${i === 0 ? 'text-3xl sm:text-4xl text-obsidian' : 'text-2xl sm:text-3xl text-obsidian/60'}`}
                    variants={fadeUp} initial="hidden" animate="visible" custom={i + 2}
                  >
                    {role}
                  </motion.p>
                ))}
              </div>
            </div>

            <motion.p
              className="mt-8 text-base text-obsidian/60 max-w-lg leading-relaxed"
              variants={fadeUp} initial="hidden" animate="visible" custom={5}
            >
              {hero.intro}
            </motion.p>

            <motion.div
              className="mt-8 flex items-center gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={6}
            >
              <a
                href="#showcase"
                className="px-6 py-3 bg-obsidian text-ivory text-sm font-medium rounded-full hover:bg-charcoal transition-colors duration-300"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-obsidian/20 text-sm font-medium rounded-full hover:bg-obsidian/5 transition-colors duration-300"
              >
                Let's Connect
              </a>
            </motion.div>
          </div>

          {/* Right: Portrait (desktop) + Floating cards */}
          <div className="relative order-1 lg:order-2 hidden lg:block">
            <div className="relative">
              <Portrait />

              {/* Spotify Card */}
              <motion.div
                className="absolute -top-4 -right-8 z-20 cursor-grab active:cursor-grabbing select-none"
                drag={true}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                animate={{
                  x: positions.spotify?.x || 0,
                  y: positions.spotify?.y || 0,
                }}
                whileHover={{ y: -4 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onDragEnd={(e, info) => handleDragEnd('spotify', info)}
              >
                <APICard type="Spotify" data={apiCards.spotify} />
              </motion.div>

              {/* Discord Card */}
              <motion.div
                className="absolute bottom-28 -right-12 z-20 cursor-grab active:cursor-grabbing select-none"
                drag={true}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                animate={{
                  x: positions.discord?.x || 0,
                  y: positions.discord?.y || 0,
                }}
                whileHover={{ y: -4 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onDragEnd={(e, info) => handleDragEnd('discord', info)}
              >
                <APICard type="Discord" data={apiCards.discord} />
              </motion.div>

              {/* Current Project Widget */}
              <motion.div
                className="absolute top-52 left-16 z-20 cursor-grab active:cursor-grabbing select-none"
                drag={true}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                animate={{
                  x: positions.currentProject?.x || 0,
                  y: positions.currentProject?.y || 0,
                }}
                whileHover={{ y: -4 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onDragEnd={(e, info) => handleDragEnd('currentProject', info)}
              >
                <Widget type="currentProject" data={widgets.currentProject} />
              </motion.div>

              {/* GitHub Card */}
              <motion.div
                className="absolute top-24 left-2 z-20 cursor-grab active:cursor-grabbing select-none"
                drag={true}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                animate={{
                  x: positions.github?.x || 0,
                  y: positions.github?.y || 0,
                }}
                whileHover={{ y: -4 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onDragEnd={(e, info) => handleDragEnd('github', info)}
              >
                <APICard type="GitHub" data={apiCards.github} />
              </motion.div>

              {/* Steam Card */}
              <motion.div
                className="absolute bottom-24 -left-24 z-20 cursor-grab active:cursor-grabbing select-none"
                drag={true}
                dragMomentum={false}
                dragElastic={0}
                initial={false}
                animate={{
                  x: positions.steam?.x || 0,
                  y: positions.steam?.y || 0,
                }}
                whileHover={{ y: -4 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onDragEnd={(e, info) => handleDragEnd('steam', info)}
              >
                <APICard type="Steam" data={apiCards.steam} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden mt-8 flex flex-wrap gap-3 justify-center">
          <APICard type="Discord" data={apiCards.discord} />
          <APICard type="Steam" data={apiCards.steam} />
          <APICard type="Spotify" data={apiCards.spotify} />
          <APICard type="GitHub" data={apiCards.github} />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 ${
            isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-pointer'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isScrolled ? 0 : 1, y: 0 }}
          transition={{ delay: isScrolled ? 0 : 1.5, duration: 0.5 }}
          onClick={() => {
            if (!isScrolled) {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          {/* Pulsing ring */}
          <motion.div
            className="relative flex items-center justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          >
            <motion.div
              className="absolute w-12 h-12 rounded-full border border-obsidian/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            />
            <div className="w-10 h-10 rounded-full bg-obsidian flex items-center justify-center shadow-lg shadow-obsidian/25">
              <ArrowDown size={16} className="text-ivory" strokeWidth={2} />
            </div>
          </motion.div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-obsidian font-bold bg-obsidian/8 px-3 py-1 rounded-full">Scroll</span>
        </motion.div>
      </div>

      {/* Admin Floating Card Control Toolbar */}
      {isAdminUser && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
          {toastMessage && (
            <div className="flex items-center gap-2 bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-black animate-bounce">
              <Check size={14} className="stroke-[3]" />
              <span>{toastMessage}</span>
            </div>
          )}

          <div className="flex items-center gap-3 bg-black text-white p-3 px-4 rounded-2xl shadow-2xl border-2 border-white/20 backdrop-blur-md">
            <div className="flex items-center gap-2 pr-2 border-r border-white/15">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Admin Mode</span>
                <span className="text-[11px] font-medium text-white/80">Drag cards to reposition</span>
              </div>
            </div>

            <button
              onClick={handleSavePositions}
              disabled={isSaving}
              className={`px-3.5 py-2 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer select-none ${
                hasUnsavedChanges
                  ? 'bg-[#1DB954] text-black hover:bg-[#1DB954]/90 animate-pulse'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              <Save size={13} />
              <span>{isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes *' : 'Save Locations'}</span>
            </button>

            <button
              onClick={handleResetPositions}
              className="px-3 py-2 bg-white/10 text-white hover:bg-white/20 font-bold text-xs rounded-xl transition-all active:scale-95 cursor-pointer select-none flex items-center gap-1"
              title="Reset positions to default"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}