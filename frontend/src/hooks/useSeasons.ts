import { QUERY_KEY } from "@/constants/query-key";
import { getAvailableSeasons } from "@/services/seasons";
import { useQuery } from "@tanstack/react-query";

export function useSeasons() {
  return useQuery<string[]>({
    queryKey: [QUERY_KEY.SEASONS],
    queryFn: async () => {
      return await getAvailableSeasons();
    },
    initialData: [],
  });
}
