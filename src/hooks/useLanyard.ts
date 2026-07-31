import { useQuery } from '@tanstack/react-query';
import { fetchLanyardData } from '@/services/lanyard';
import { LanyardData } from '@/types/lanyard';

export function useLanyard() {
  const discordUserId = import.meta.env.VITE_DISCORD_USER_ID;

  return useQuery<LanyardData, Error>({
    queryKey: ['lanyard', discordUserId],
    queryFn: fetchLanyardData,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3, // Retry up to 3 times on failure
    staleTime: 15000,
    refetchOnWindowFocus: true,
  });
}
