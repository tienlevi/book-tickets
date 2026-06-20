import { instance } from "@/configs/axios";

export const getMatches = async (
  seasonId: number | string,
  round: number | string
) => {
  const response = await instance.get(
    `/unique-tournament/17/season/${seasonId}/events/round/${round}`
  );
  return response.data;
};

export const getMatchById = async (matchId: number | string) => {
  const response = await instance.get(`/event/${matchId}`);
  return response.data;
};
