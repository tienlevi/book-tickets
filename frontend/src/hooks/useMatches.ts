import { QUERY_KEY } from "@/constants/query-key";
import { IMatch } from "@/interfaces/match";
import { getMatches } from "@/services/matches";
import { useQuery } from "@tanstack/react-query";

export function useMatches(season: string, round: string) {
  return useQuery<IMatch[]>({
    queryKey: [QUERY_KEY.MATCHES, season, round],
    queryFn: async () => {
      const response = await getMatches(round, season);
      return response || [];
    },
    enabled: !!season && !!round,
  });
}
