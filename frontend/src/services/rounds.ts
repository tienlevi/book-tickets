import { instance } from "@/configs/axios";

export const getRounds = async (seasonId: number) => {
  const response = await instance.get(`/rounds/${seasonId}`);
  return response.data;
};
