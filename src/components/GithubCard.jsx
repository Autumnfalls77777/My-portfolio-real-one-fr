import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen } from 'lucide-react';

async function fetchGithubUser() {
  const res = await fetch('https://api.github.com/users/Autumnfalls77777');
  if (!res.ok) {
    throw new Error('Failed to fetch GitHub profile');
  }
  return res.json();
}

export default function GithubCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['github-user', 'Autumnfalls77777'],
    queryFn: fetchGithubUser,
    staleTime: 60000,
    retry: 2,
  });

  const avatar = data?.avatar_url || 'https://github.com/Autumnfalls77777.png';
  const username = data?.login || 'Autumnfalls77777';
  const name = data?.name || 'Prabal Jaiswal';
  const profileUrl = data?.html_url || 'https://github.com/Autumnfalls77777';

  if (isLoading) {
    return (
      <div className="bg-[#18181b] border-2 border-black rounded-xl p-3.5 text-white shadow-xs space-y-3 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-700/60 flex-shrink-0" />
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="h-4 w-24 bg-zinc-700/60 rounded" />
            <div className="h-3 w-16 bg-zinc-700/40 rounded" />
          </div>
        </div>
        <div className="pt-2 border-t border-zinc-800 flex justify-between">
          <div className="h-3 w-16 bg-zinc-700/40 rounded" />
          <div className="h-3 w-16 bg-zinc-700/40 rounded" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-[#18181b] border-2 border-black rounded-xl p-3.5 text-white shadow-xs space-y-3 group hover:border-zinc-700 transition-colors"
    >
      {/* Top section: Avatar + Username + Real Name */}
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={username}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover border border-zinc-700 bg-zinc-800 flex-shrink-0"
          onError={(e) => {
            e.currentTarget.src = 'https://github.com/Autumnfalls77777.png';
          }}
        />
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-bold text-white truncate leading-tight tracking-tight group-hover:text-sky-400 transition-colors">
            {username}
          </h4>
          <p className="text-xs font-semibold text-zinc-400 truncate mt-0.5 font-mono">
            {name}
          </p>
        </div>
      </div>

      {/* Live Data Stats (Fetched live from GitHub API) */}
      <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
        <div className="flex items-center gap-1.5 font-mono">
          <BookOpen size={13} className="text-zinc-400" />
          <span className="font-extrabold text-white">{data?.public_repos ?? 0}</span> repos
        </div>
        <div className="flex items-center gap-1.5 font-mono">
          <Users size={13} className="text-zinc-400" />
          <span className="font-extrabold text-white">{data?.followers ?? 0}</span> followers
        </div>
      </div>
    </a>
  );
}

