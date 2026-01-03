import { QUERY_KEY } from "@/constants/query-key";
import { IMatchDetailEvent } from "@/interfaces/match";
import { getMatchById } from "@/services/matches";
import { useQuery } from "@tanstack/react-query";

export const useMatchById = (matchId: number) => {
  return useQuery<{ event: IMatchDetailEvent }>({
    queryKey: [QUERY_KEY.MATCHES, matchId],
    queryFn: async () => {
      return await getMatchById(matchId);
    },
    enabled: !!matchId,
  });
};
