import { QUERY_KEY } from "@/constants/query-key";
import { IMatch } from "@/interfaces/match";
import { getMatches } from "@/services/matches";
import { useQuery } from "@tanstack/react-query";

export function useMatches(seasonId: number, round: number) {
  return useQuery<IMatch>({
    queryKey: [QUERY_KEY.MATCHES, seasonId, round],
    queryFn: async () => {
      return await getMatches(seasonId, round);
    },
    enabled: !!seasonId && !!round,
  });
}
