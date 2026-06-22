import { instance } from "@/configs/axios";

export const getRounds = async (season: string) => {
  const response = await instance.get(`/rounds`, { params: { season } });
  return response.data;
};
