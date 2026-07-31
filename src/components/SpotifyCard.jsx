import React, { useState, useEffect } from 'react';
import { useLanyard } from '@/hooks/useLanyard';
import { Play } from 'lucide-react';

function formatTime(ms) {
  if (!ms || isNaN(ms) || ms < 0) return '0:00';
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = Math.floor(totalSec % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

export default function SpotifyCard() {
  const { data, isLoading } = useLanyard();
  const [now, setNow] = useState(Date.now());

  const isListening = Boolean(data?.listening_to_spotify && data?.spotify);
  const spotify = data?.spotify;

  // Real-time progress bar animation interval (updates every 1s)
  useEffect(() => {
    if (!isListening || !spotify?.timestamps?.start || !spotify?.timestamps?.end) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [isListening, spotify?.timestamps?.start, spotify?.timestamps?.end]);

  const start = spotify?.timestamps?.start || 0;
  const end = spotify?.timestamps?.end || 0;
  const totalDuration = Math.max(1, end - start);
  const elapsed = isListening ? Math.max(0, Math.min(now - start, totalDuration)) : 0;
  const progressPercent = isListening ? Math.min(100, Math.max(0, (elapsed / totalDuration) * 100)) : 0;

  const trackId = spotify?.track_id;
  const spotifyUrl = trackId ? `https://open.spotify.com/track/${trackId}` : 'https://open.spotify.com';

  const songTitle = isListening ? spotify?.song : 'No Song Playing';
  const artistName = isListening ? spotify?.artist : 'Not listening right now';

  if (isLoading) {
    return (
      <div className="bg-[#1DB954] border-2 border-black rounded-xl p-3.5 text-black shadow-xs space-y-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black/20 rounded-md flex-shrink-0" />
          <div className="flex-1 space-y-1 min-w-0">
            <div className="h-3 w-16 bg-black/20 rounded" />
            <div className="h-4 w-24 bg-black/30 rounded" />
            <div className="h-3 w-16 bg-black/20 rounded" />
          </div>
        </div>
        <div className="h-1.5 w-full bg-black/20 rounded-full" />
        <div className="h-7 w-20 mx-auto bg-black/30 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-[#1DB954] border-2 border-black rounded-xl p-3.5 text-black shadow-xs space-y-2.5">
      {/* Track Info Header: Album Art + Now Playing + Song & Artist */}
      <div className="flex items-center gap-2.5 min-w-0">
        {spotify?.album_art_url ? (
          <a
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex-shrink-0"
            title="Open track on Spotify"
          >
            <img
              src={spotify.album_art_url}
              alt={songTitle}
              className="w-10 h-10 rounded-md object-cover border border-black/30 shadow-xs transition-transform group-hover:scale-105"
            />
          </a>
        ) : (
          <div className="w-10 h-10 rounded-md bg-black/10 border border-black/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-black/60">🎵</span>
          </div>
        )}

        {/* Title & Artist */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold text-black/70 uppercase tracking-wider leading-none mb-0.5">
            {isListening ? 'Now Playing' : 'Spotify'}
          </p>
          <h4 className="text-xs font-black text-black truncate leading-tight tracking-tight">
            {songTitle}
          </h4>
          <p className="text-[11px] font-bold text-black/80 truncate mt-0.5">
            {artistName}
          </p>
        </div>
      </div>

      {/* Real-time Timeline Progress Bar */}
      <div className="pt-0.5 space-y-1">
        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden border border-black/10">
          <div
            className="h-full bg-black rounded-full transition-all duration-300 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {isListening && (
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-black/85 leading-none">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        )}
      </div>

      {/* Play Button - Opens song in Spotify */}
      <div className="pt-0.5 flex justify-center">
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-1.5 bg-black text-[#1DB954] hover:bg-black/90 font-bold text-xs rounded-full border border-black shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer select-none"
        >
          <Play size={11} className="fill-[#1DB954]" />
          <span>Play</span>
        </a>
      </div>
    </div>
  );
}

