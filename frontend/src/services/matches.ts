import { instance } from "@/configs/axios";

export const getMatches = async (seasonId: number, round: number) => {
  const response = await instance.get(`/match/${seasonId}/round/${round}`);
  return response.data;
};
