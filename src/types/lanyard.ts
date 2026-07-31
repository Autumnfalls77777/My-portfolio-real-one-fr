export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline';

export interface AvatarDecorationData {
  asset: string;
  sku_id: string;
  expires_at: number | null;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name: string | null;
  display_name: string | null;
  bot: boolean;
  avatar_decoration_data: AvatarDecorationData | null;
  public_flags?: number;
}

export interface Timestamps {
  start?: number;
  end?: number;
}

export interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivityEmoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface Activity {
  type: number; // 0: Playing, 1: Streaming, 2: Listening, 3: Watching, 4: Custom, 5: Competing
  name: string;
  state?: string;
  details?: string;
  timestamps?: Timestamps;
  assets?: ActivityAssets;
  emoji?: ActivityEmoji;
  created_at?: number;
  id?: string;
}

export interface SpotifyData {
  track_id: string;
  timestamps: {
    start: number;
    end: number;
  };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export interface LanyardData {
  kv: Record<string, string>;
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: DiscordStatus;
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_embedded: boolean;
  active_on_discord_vr: boolean;
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

export interface LanyardResponse {
  data: LanyardData;
  success: boolean;
  error?: {
    message: string;
    code: string;
  };
}
