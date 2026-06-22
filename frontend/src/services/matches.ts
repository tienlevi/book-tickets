import { instance } from "@/configs/axios";

export const getMatches = async (round: string, season: string) => {
  const formatSeasonText = season.replace("/", "-");

  const response = await instance.get(`/matches`, {
    params: { round, season: formatSeasonText },
  });
  return response.data;
};

export const getMatchById = async (matchId: number | string) => {
  const response = await instance.get(`/matches/${matchId}`);
  return response.data;
};
