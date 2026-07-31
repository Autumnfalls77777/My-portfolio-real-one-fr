import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, MessageCircle, Github, Gamepad2, MoreHorizontal } from 'lucide-react';
import DiscordCard from '@/components/DiscordCard';
import SpotifyCard from '@/components/SpotifyCard';
import GithubCard from '@/components/GithubCard';
import DiscordLogo from '@/components/DiscordLogo';
import SpotifyLogo from '@/components/SpotifyLogo';
import GithubLogo from '@/components/GithubLogo';
import { portfolioApi } from '@/api/portfolioApi';

const iconMap = {
  Spotify: Music,
  Discord: MessageCircle,
  GitHub: Github,
  Steam: Gamepad2,
};

const accentMap = {
  Spotify: "#1DB954",
  Discord: "#5865F2",
  GitHub: "#0F0F0F",
  Steam: "#1B2838",
};

function SteamContent({ data: initialData }) {
  const [steamData, setSteamData] = useState(null);
  const [activeGameIndex, setActiveGameIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchSteam = async () => {
      try {
        const res = await portfolioApi.steam.getProfile();
        if (isMounted && res) {
          setSteamData(res);
        }
      } catch (e) {
        // Silent catch
      }
    };
    fetchSteam();
    const pollInterval = setInterval(fetchSteam, 30000);
    return () => {
      isMounted = false;
      clearInterval(pollInterval);
    };
  }, []);

  const player = steamData?.player;
  const rawGames = (steamData?.games && steamData.games.length > 0)
    ? steamData.games
    : [
        {
          name: "Brawlhalla",
          hours: 1335,
          appid: 291550,
          icon: "https://media.steampowered.com/steamcommunity/public/images/apps/291550/c43fac31b8bf8821764603a14d09412bc3d45f66.jpg",
          rank: 1
        },
        {
          name: "Combat Master",
          hours: 6,
          appid: 2281730,
          icon: "https://media.steampowered.com/steamcommunity/public/images/apps/2281730/6d21b6a817f63c5ad327da04fecda3d4f9c7e455.jpg",
          rank: 2
        },
        {
          name: "Stumble Guys",
          hours: 2,
          appid: 1677740,
          icon: "https://media.steampowered.com/steamcommunity/public/images/apps/1677740/4517b0a1eff3befd699ede64a57e3f816d581be7.jpg",
          rank: 3
        }
      ];
  
  // Top played games
  const topGames = rawGames.slice(0, 5);

  const username = player?.personaname || initialData?.username || 'ItzPal';
  const avatar = player?.avatar || 'https://avatars.steamstatic.com/2b467ca9342b48cbd8da52c2566f74622ddc915d_full.jpg';
  const playerStatus = player?.stateText || initialData?.status || 'Online';
  const isOnline = player ? player.personastate !== 0 : true;
  const profileUrl = player?.profileurl || 'https://steamcommunity.com/profiles/76561199048277689/';

  // Switch game every 4 seconds between top played games
  useEffect(() => {
    if (topGames.length <= 1) return;
    const timer = setInterval(() => {
      setActiveGameIndex((prev) => (prev + 1) % topGames.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [topGames.length]);

  const hasGames = topGames.length > 0;
  const currentGame = hasGames ? topGames[activeGameIndex % topGames.length] : null;
  const rankLabel = currentGame ? (currentGame.rank === 1 ? '#1 MOST PLAYED' : `#${currentGame.rank} MOST PLAYED`) : 'STEAM PROFILE';
  const currentGameIcon = currentGame?.icon || (currentGame?.appid ? `https://media.steampowered.com/steamcommunity/public/images/apps/${currentGame.appid}/header.jpg` : null);

  return (
    <div className="relative overflow-hidden flex flex-col justify-between text-slate-100 min-h-[82px]">
      {/* User Header: Avatar + Username + Rank */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-sky-500/20">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={avatar}
            alt={username}
            className="w-6 h-6 rounded-full object-cover border border-[#66c0f4]/50 shadow-xs flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = 'https://avatars.steamstatic.com/2b467ca9342b48cbd8da52c2566f74622ddc915d_full.jpg';
            }}
          />
          <span className="text-xs font-bold text-white truncate drop-shadow-xs">{username}</span>
        </div>
        <span className="text-[8px] uppercase tracking-wider font-mono font-bold text-[#66c0f4] px-1.5 py-0.5 rounded bg-[#66c0f4]/15 border border-[#66c0f4]/30 flex-shrink-0">
          {hasGames ? rankLabel : 'STEAM'}
        </span>
      </div>

      {/* 4-Second Animated Game Content with Game Icon */}
      <div className="my-0.5 min-h-[38px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {hasGames && currentGame ? (
            <motion.div
              key={currentGame.name + activeGameIndex}
              initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(2px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2"
            >
              {currentGameIcon && (
                <img
                  src={currentGameIcon}
                  alt={currentGame.name}
                  className="w-6 h-6 rounded-md object-cover flex-shrink-0 border border-sky-500/40 shadow-xs"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate leading-tight tracking-wide drop-shadow-xs">
                  {currentGame.name}
                </p>
                <p className="text-[11px] text-[#c6d4df] mt-0.5 font-medium">
                  {currentGame.hours.toLocaleString()}h played
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="profile-summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xs text-[#c6d4df] font-medium">
                {player?.gameextrainfo ? `Playing ${player.gameextrainfo}` : 'Steam Account Live'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer: Live Status & Profile Link */}
      <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-sky-500/20">
        <div className="flex items-center gap-1.5 truncate">
          <span className={`h-2 w-2 rounded-full flex-shrink-0 ${isOnline ? 'bg-[#a4d007] shadow-[0_0_8px_#a4d007] animate-pulse' : 'bg-gray-400'}`} />
          <span className="text-[10px] text-[#c6d4df] truncate font-medium">
            {playerStatus}
          </span>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-mono font-bold text-[#66c0f4] hover:text-white transition-colors flex-shrink-0"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

const contentMap = {
  Spotify: SpotifyCard,
  Discord: DiscordCard,
  GitHub: GithubCard,
  Steam: SteamContent,
};

export default function APICard({ type, data, className = "", style = {} }) {
  const Icon = iconMap[type];
  const ContentComponent = contentMap[type];
  const accent = accentMap[type];
  const isSteam = type === 'Steam';
  const isDiscord = type === 'Discord';
  const isSpotify = type === 'Spotify';
  const isGitHub = type === 'GitHub';

  if (isDiscord) {
    return (
      <div
        className={`p-3.5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none w-[235px] ${className}`}
        style={style}
      >
        {/* Prototype Card Header: Discord pill with real Discord logo + 3-dots */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-black shadow-xs">
            <DiscordLogo className="w-4 h-3.5" color="#5865F2" />
            <span className="text-xs font-bold text-[#5865F2] tracking-tight">Discord</span>
          </div>
          <MoreHorizontal size={20} className="text-black stroke-[2.5]" />
        </div>

        {/* Discord Card Inner Content */}
        <DiscordCard data={data} />
      </div>
    );
  }

  if (isSpotify) {
    return (
      <div
        className={`p-3.5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none w-[235px] ${className}`}
        style={style}
      >
        {/* Prototype Card Header: Black Spotify pill with real green Spotify logo + 3-dots */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black border border-black shadow-xs">
            <SpotifyLogo className="w-4 h-4" color="#1DB954" />
            <span className="text-xs font-bold text-[#1DB954] tracking-tight">Spotify</span>
          </div>
          <MoreHorizontal size={20} className="text-black stroke-[2.5]" />
        </div>

        {/* Spotify Card Inner Content */}
        <SpotifyCard data={data} />
      </div>
    );
  }

  if (isGitHub) {
    return (
      <div
        className={`p-3.5 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none w-[235px] ${className}`}
        style={style}
      >
        {/* Prototype Card Header: White GitHub pill with real Octocat logo + 3-dots */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-black shadow-xs">
            <GithubLogo className="w-4 h-4" color="#000000" />
            <span className="text-xs font-bold text-black tracking-tight uppercase">GitHub</span>
          </div>
          <MoreHorizontal size={20} className="text-black stroke-[2.5]" />
        </div>

        {/* GitHub Card Inner Content */}
        <GithubCard data={data} />
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-2xl select-none ${
        isSteam
          ? 'bg-gradient-to-br from-[#171a21] via-[#1b2838] to-[#2a475e] border border-[#66c0f4]/30 shadow-xl shadow-[#1b2838]/50 text-white'
          : 'bg-white/90 border border-sand shadow-lg'
      } w-[220px] ${className}`}
      style={style}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center overflow-hidden ${
              isSteam
                ? 'w-7 h-7 rounded-full bg-[#171a21] border border-[#66c0f4]/50 shadow-[0_0_8px_rgba(102,192,244,0.35)]'
                : 'w-6 h-6 rounded-lg'
            }`}
            style={{ backgroundColor: isSteam ? undefined : accent + "15" }}
          >
            {isSteam ? (
              <img
                src="/images/steam.png"
                alt="Steam Logo"
                className="w-full h-full object-cover rounded-full filter brightness-110"
              />
            ) : (
              <Icon size={13} style={{ color: accent }} />
            )}
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-[0.15em] ${isSteam ? 'text-[#66c0f4] font-bold' : 'text-obsidian/40'}`}>
            {type}
          </span>
        </div>
        <span className={`h-1.5 w-1.5 rounded-full ${isSteam ? 'bg-[#a4d007] shadow-[0_0_6px_#a4d007]' : 'bg-lime'} animate-pulse`} />
      </div>
      <ContentComponent data={data} />
    </div>
  );
}