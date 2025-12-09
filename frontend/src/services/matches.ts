import { instance } from "@/configs/axios";

export const getMatches = async (seasonId: number, round: number) => {
  const response = await instance.get(`/match/${seasonId}/round/${round}`);
  return response.data;
};

export const getMatchDetail = async (matchId: number) => {
  const response = await instance.get(`/match/${matchId}`);
  return response.data;
};