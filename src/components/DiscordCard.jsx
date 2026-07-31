import React from 'react';
import { useLanyard } from '@/hooks/useLanyard';
import { getDiscordAvatarUrl, getStatusBadgeStyle, getCustomStatus, getCurrentActivityText } from '@/services/lanyard';

export default function DiscordCard() {
  const { data, isLoading, isError } = useLanyard();

  // Fallback defaults matching current card details when offline/loading/no data
  const user = data?.discord_user;
  const status = data?.discord_status || 'online';
  const avatarUrl = user ? getDiscordAvatarUrl(user) : 'https://cdn.discordapp.com/embed/avatars/0.png';
  const statusBadge = getStatusBadgeStyle(status);
  const displayName = user?.display_name || user?.global_name || user?.username || 'Autumn';
  const username = user?.username || 'itzpal';
  const customStatus = data ? getCustomStatus(data.activities) : { text: 'ILLSM!', emoji: null };
  const activityText = data ? getCurrentActivityText(data.activities) : 'No active session';

  if (isLoading) {
    return (
      <div className="bg-[#6c82e6] border-2 border-black rounded-xl p-3.5 text-black shadow-xs space-y-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/40 border border-black flex-shrink-0" />
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="h-4 w-24 bg-white/40 rounded" />
            <div className="h-3 w-16 bg-white/30 rounded" />
          </div>
        </div>
        <div className="pt-2 border-t border-black/10 space-y-1">
          <div className="h-3.5 w-20 bg-white/40 rounded" />
          <div className="h-3 w-28 bg-white/30 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#6c82e6] border-2 border-black rounded-xl p-3.5 text-black shadow-xs space-y-2.5">
      {/* User Info Header: Avatar + Name + Status/Handle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={avatarUrl}
            alt={displayName}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover border-2 border-black bg-white"
            onError={(e) => {
              e.currentTarget.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
            }}
          />
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-black ${statusBadge.bgClass}`}
            title={statusBadge.label}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-bold text-black truncate leading-tight tracking-tight">{displayName}</h4>
          <p className="text-xs font-semibold text-black/80 truncate font-mono">
            @{username} <span className="text-black/40">•</span> <span className="font-sans text-[11px] capitalize">{status}</span>
          </p>
        </div>
      </div>

      {/* Details currently displaying (Custom status + Activity) */}
      <div className="pt-2 border-t border-black/15 space-y-1">
        {customStatus && (customStatus.text || customStatus.emoji) ? (
          <p className="text-xs font-bold text-black truncate flex items-center gap-1">
            {customStatus.emoji && <span>{customStatus.emoji}</span>}
            <span>{customStatus.text}</span>
          </p>
        ) : null}
        <p className="text-xs font-semibold text-black/85 truncate">
          {activityText}
        </p>
      </div>
    </div>
  );
}

