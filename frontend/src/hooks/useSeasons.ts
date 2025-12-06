import { QUERY_KEY } from "@/constants/query-key";
import { ISeasons } from "@/interfaces/seasons";
import { getSeasons } from "@/services/seasons";
import { useQuery } from "@tanstack/react-query";

export function useSeasons() {
  return useQuery<ISeasons[]>({
    queryKey: [QUERY_KEY.SEASONS],
    queryFn: async () => {
      const result = await getSeasons();
      return result;
    },
  });
}

export function useSeasonById() {}
