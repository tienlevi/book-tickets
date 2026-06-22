import { instance } from "@/configs/axios";

export const getSeasons = async () => {
  const response = await instance.get(`/seasons`);
  return response.data;
};

export const getAvailableSeasons = async () => {
  const response = await instance.get(`/available-seasons`);
  return response.data;
};
