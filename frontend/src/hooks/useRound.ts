import { QUERY_KEY } from "@/constants/query-key";
import { IRound } from "@/interfaces/round";
import { getRounds } from "@/services/rounds";
import { useQuery } from "@tanstack/react-query";

function useRound(season: string) {
  return useQuery<IRound>({
    queryKey: [QUERY_KEY.ROUNDS, season],
    queryFn: async () => {
      const result = await getRounds(season);
      return result;
    },
    enabled: !!season,
  });
}

export default useRound;
