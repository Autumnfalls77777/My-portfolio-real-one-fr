import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Github, MessageCircle, Mail, Palette, ArrowUpRight } from 'lucide-react';
import contactData from '@/data/contact.json';
import { DiscordModal, LinkedInModal } from './SocialModals';

const { socials } = contactData;

const iconMap = { Linkedin, Instagram, Github, MessageCircle, Mail, Palette };

export default function SocialCards() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const [linkedinOpen, setLinkedinOpen] = useState(false);

  const handleCardClick = (social, e) => {
    if (social.action === 'discord-modal') {
      e.preventDefault();
      setDiscordOpen(true);
    } else if (social.action === 'linkedin-modal') {
      e.preventDefault();
      setLinkedinOpen(true);
    }
  };

  return (
    <section className="py-10 px-6">
      <DiscordModal isOpen={discordOpen} onClose={() => setDiscordOpen(false)} />
      <LinkedInModal isOpen={linkedinOpen} onClose={() => setLinkedinOpen(false)} />

      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-3">Find Me On</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            Let's <span className="italic text-obsidian/50">connect.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socials.map((social, i) => {
            const Icon = iconMap[social.icon] || Mail;
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                onClick={(e) => handleCardClick(social, e)}
                target={social.url.startsWith('mailto') || social.action ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group relative p-6 rounded-2xl border border-sand/80 bg-white/30 hover:bg-white/60 hover:border-sand transition-all duration-300 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: social.color }}
                />
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: social.color + "12" }}
                  >
                    <Icon size={18} style={{ color: social.color }} />
                  </div>
                  <ArrowUpRight size={16} className="text-obsidian/20 group-hover:text-obsidian/60 group-hover:rotate-45 transition-all duration-300" />
                </div>
                <h3 className="text-base font-heading font-semibold mb-1">{social.platform}</h3>
                <p className="text-xs font-mono text-obsidian/40 mb-2">{social.username}</p>
                <p className="text-sm text-obsidian/50 leading-relaxed">{social.description}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}