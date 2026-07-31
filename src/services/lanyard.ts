import { LanyardData, LanyardResponse, DiscordUser, DiscordStatus, Activity } from '@/types/lanyard';

const LANYARD_API_BASE = 'https://api.lanyard.rest/v1';

export async function fetchLanyardData(): Promise<LanyardData> {
  const discordUserId = import.meta.env.VITE_DISCORD_USER_ID;

  if (!discordUserId) {
    throw new Error('VITE_DISCORD_USER_ID environment variable is missing.');
  }

  const response = await fetch(`${LANYARD_API_BASE}/users/${discordUserId}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Lanyard API returned status ${response.status}`);
  }

  const payload: LanyardResponse = await response.json();

  if (!payload.success || !payload.data) {
    throw new Error(payload.error?.message || 'Failed to fetch presence data from Lanyard');
  }

  return payload.data;
}

/**
 * Returns Discord avatar URL or default fallback
 */
export function getDiscordAvatarUrl(user: DiscordUser): string {
  if (user.avatar) {
    const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}?size=128`;
  }
  const defaultIndex = parseInt(user.discriminator || '0', 10) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
}

/**
 * Returns status indicator CSS color info
 */
export function getStatusBadgeStyle(status: DiscordStatus): { bgClass: string; hex: string; label: string } {
  switch (status) {
    case 'online':
      return { bgClass: 'bg-emerald-500', hex: '#22c55e', label: 'Online' };
    case 'idle':
      return { bgClass: 'bg-amber-500', hex: '#eab308', label: 'Idle' };
    case 'dnd':
      return { bgClass: 'bg-red-500', hex: '#ef4444', label: 'Do Not Disturb' };
    case 'offline':
    default:
      return { bgClass: 'bg-gray-400', hex: '#9ca3af', label: 'Offline' };
  }
}

/**
 * Returns custom status if set
 */
export function getCustomStatus(activities: Activity[] = []): { text: string; emoji?: string } | null {
  const custom = activities.find(a => a.type === 4);
  if (!custom) return null;
  const text = custom.state || custom.details || '';
  const emoji = custom.emoji?.name || '';
  if (!text && !emoji) return null;
  return { text, emoji };
}

/**
 * Returns active game or application name (e.g. Visual Studio Code, Valorant, Minecraft)
 * If none: "No active session"
 */
export function getCurrentActivityText(activities: Activity[] = []): string {
  // Exclude custom status (type === 4)
  const gameOrApp = activities.find(a => a.type !== 4);
  if (!gameOrApp) {
    return 'No active session';
  }
  if (gameOrApp.details) {
    return `${gameOrApp.name}: ${gameOrApp.details}`;
  }
  return gameOrApp.name;
}
