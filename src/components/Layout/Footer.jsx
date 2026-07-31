import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Github, Mail, MessageCircle } from 'lucide-react';
import { DiscordModal, LinkedInModal } from '@/components/Contact/SocialModals';

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Autumnfalls77777" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/itzpal101" },
  { icon: MessageCircle, label: "Discord", href: "#discord", action: "discord" },
  { icon: Mail, label: "Email", href: "mailto:prabaljaiswal69420@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#linkedin", action: "linkedin" },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Designs", to: "/designs" },
  { label: "Software", to: "/software" },
  { label: "Resume", to: "/resume" },
  { label: "Career", to: "/career" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const [linkedinOpen, setLinkedinOpen] = useState(false);

  const handleClick = (social, e) => {
    if (social.action === 'discord') {
      e.preventDefault();
      setDiscordOpen(true);
    } else if (social.action === 'linkedin') {
      e.preventDefault();
      setLinkedinOpen(true);
    }
  };

  return (
    <footer className="border-t border-sand bg-ivory">
      <DiscordModal isOpen={discordOpen} onClose={() => setDiscordOpen(false)} />
      <LinkedInModal isOpen={linkedinOpen} onClose={() => setLinkedinOpen(false)} />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-mono text-lg font-semibold text-obsidian">
              Prabal<span className="text-[#C49A6C]">_</span>
            </Link>
            <nav className="hidden sm:flex gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-obsidian/50 hover:text-obsidian transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => handleClick(social, e)}
                  target={social.href.startsWith("mailto") || social.action ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-sand flex items-center justify-center text-obsidian/50 hover:text-obsidian hover:border-[#C49A6C]/40 hover:bg-[#C49A6C]/10 transition-all duration-300 cursor-pointer"
                >
                  <Icon size={14} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="sm:hidden flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 pt-6 border-t border-sand/60">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-obsidian/50 hover:text-obsidian transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-sand/60 text-center">
          <p className="text-xs text-obsidian/30">
            © {new Date().getFullYear()} Prabal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}