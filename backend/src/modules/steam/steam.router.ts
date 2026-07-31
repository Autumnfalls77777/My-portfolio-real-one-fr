import { Router } from 'express';
import { env } from '../../config/env.js';
import { asyncHandler } from '../../lib/asyncHandler.js';
import { ok } from '../../lib/response.js';

export const steamRouter = Router();

// 30-second in-memory cache
interface SteamCache {
  data: any;
  timestamp: number;
}

let cache: SteamCache | null = null;
const CACHE_TTL_MS = 30 * 1000;

steamRouter.get('/', asyncHandler(async (_req, res) => {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL_MS) {
    ok(res, cache.data);
    return;
  }

  const apiKey = env.STEAM_API_KEY;
  const steamId = env.STEAM_ID || '76561199048277689';

  let playerData = {
    steamid: steamId,
    personaname: "ItzPal",
    profileurl: `https://steamcommunity.com/profiles/${steamId}`,
    avatar: "https://avatars.steamstatic.com/2b467ca9342b48cbd8da52c2566f74622ddc915d_full.jpg",
    personastate: 1,
    stateText: "Online",
    gameextrainfo: null as string | null,
    gameid: null as string | null
  };

  let gamesList: Array<{ name: string; hours: number; appid: number; rank: number }> = [];

  try {
    // 1. Fetch Player Summary
    const summaryUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;
    const summaryRes = await fetch(summaryUrl);
    if (summaryRes.ok) {
      const summaryJson = await summaryRes.json();
      const player = summaryJson?.response?.players?.[0];
      if (player) {
        const stateMap: Record<number, string> = {
          0: "Offline",
          1: "Online",
          2: "Busy",
          3: "Away",
          4: "Snooze",
          5: "Looking to Trade",
          6: "Looking to Play"
        };

        let stateText = stateMap[player.personastate] || "Online";
        if (player.gameextrainfo) {
          stateText = `Playing ${player.gameextrainfo}`;
        }

        playerData = {
          steamid: player.steamid || steamId,
          personaname: player.personaname || playerData.personaname,
          profileurl: player.profileurl || playerData.profileurl,
          avatar: player.avatarmedium || player.avatarfull || player.avatar || playerData.avatar,
          personastate: player.personastate ?? 1,
          stateText,
          gameextrainfo: player.gameextrainfo || null,
          gameid: player.gameid || null
        };
      }
    }

    // 2. Always Fetch Owned Games sorted by playtime
    const gamesUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&include_played_free_games=true&format=json`;
    const gamesRes = await fetch(gamesUrl);
    if (gamesRes.ok) {
      const gamesJson = await gamesRes.json();
      const rawGames = gamesJson?.response?.games;
      if (Array.isArray(rawGames) && rawGames.length > 0) {
        const sorted = rawGames
          .filter((g: any) => g.playtime_forever > 0)
          .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever);

        gamesList = sorted.slice(0, 10).map((g: any, idx: number) => ({
          name: g.name || `App ${g.appid}`,
          hours: Math.round(g.playtime_forever / 60),
          appid: g.appid,
          icon: g.img_icon_url ? `https://media.steampowered.com/steamcommunity/public/images/apps/${g.appid}/${g.img_icon_url}.jpg` : `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
          header: `https://cdn.cloudflare.steamstatic.com/steam/apps/${g.appid}/header.jpg`,
          rank: idx + 1
        }));
      }
    }
  } catch (err) {
    console.warn('[Steam Router] Error fetching Steam API:', err);
  }

  const result = {
    player: playerData,
    games: gamesList
  };

  cache = { data: result, timestamp: now };
  ok(res, result);
}));
