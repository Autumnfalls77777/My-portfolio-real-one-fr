import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, MessageCircle, Linkedin, Mail, Instagram } from 'lucide-react';
import { useLanyard } from '@/hooks/useLanyard';
import { getDiscordAvatarUrl, getStatusBadgeStyle } from '@/services/lanyard';

export function DiscordModal({ isOpen, onClose }) {
  const { data } = useLanyard();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const discordUser = data?.discord_user;
  const status = data?.discord_status || 'online';
  const avatarUrl = discordUser
    ? getDiscordAvatarUrl(discordUser)
    : 'https://cdn.discordapp.com/embed/avatars/0.png';
  const displayName = discordUser?.display_name || discordUser?.global_name || 'itzpal101';
  const username = 'itzpal101';
  const statusBadge = getStatusBadgeStyle(status);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(username);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-sm bg-[#181412] text-white border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
              <MessageCircle size={18} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">Connect on Discord</span>
          </div>

          {/* User Profile Card */}
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-2xl border border-white/10 mb-6">
            <div className="relative mb-3">
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#5865F2] shadow-lg"
              />
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#181412] ${statusBadge.bgClass}`}
                title={statusBadge.label}
              />
            </div>
            <h4 className="text-base font-bold text-white leading-tight">{displayName}</h4>
            <p className="text-xs font-mono text-white/50 mt-0.5">@{username}</p>
          </div>

          {/* Two Main Actions */}
          <div className="space-y-3">
            {/* 1. Join Server */}
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold rounded-xl transition-all shadow-md group"
            >
              <ExternalLink size={15} />
              <span>Join Discord Server</span>
            </a>

            {/* 2. Copy Username */}
            <button
              onClick={handleCopyUsername}
              className="w-full flex items-center justify-between py-3 px-4 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/10 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-white/40 font-mono">User:</span>
                <span className="font-mono text-white">{username}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#C49A6C]">
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function LinkedInModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-sm bg-[#181412] text-white border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2]">
              <Linkedin size={18} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-white/50">LinkedIn Notice</span>
          </div>

          <div className="text-center py-4">
            <h4 className="text-lg font-heading font-bold text-white mb-2">LinkedIn Not Available</h4>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
              I don't have a active LinkedIn profile right now. Please feel free to reach out using any of my other channels below!
            </p>
          </div>

          {/* Alternative contacts */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <a
              href="mailto:prabaljaiswal69420@gmail.com"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-medium text-white transition-colors"
            >
              <Mail size={14} className="text-[#C49A6C]" />
              <span>Email</span>
            </a>
            <a
              href="https://instagram.com/itzpal101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/10 hover:bg-white/15 rounded-xl text-xs font-medium text-white transition-colors"
            >
              <Instagram size={14} className="text-[#E4405F]" />
              <span>Instagram</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
