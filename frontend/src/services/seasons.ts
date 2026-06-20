import { instance } from "@/configs/axios";

export const getSeasons = async () => {
  const response = await instance.get(`/unique-tournament/17/seasons`);
  return response.data;
};
