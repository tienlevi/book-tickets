import { QUERY_KEY } from "@/constants/query-key";
import { IRound } from "@/interfaces/round";
import { getRounds } from "@/services/rounds";
import { useQuery } from "@tanstack/react-query";

function useRound(seasonId: number) {
  return useQuery<IRound>({
    queryKey: [QUERY_KEY.ROUNDS, seasonId],
    queryFn: async () => {
      const result = await getRounds(seasonId);
      return result;
    },
    enabled: !!seasonId,
  });
}

export default useRound;
