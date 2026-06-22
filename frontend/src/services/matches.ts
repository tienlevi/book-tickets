import { instance } from "@/configs/axios";

export const getMatches = async (round: number, season: string) => {
  const response = await instance.get(
    `/matches/round/${round}/season/${season}`,
  );
  return response.data;
};

export const getMatchById = async (matchId: number | string) => {
  const response = await instance.get(`/event/${matchId}`);
  return response.data;
};
