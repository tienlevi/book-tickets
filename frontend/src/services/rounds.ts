import { instance } from "@/configs/axios";

export const getRounds = async (season: number | string) => {
  const response = await instance.get(
    `/unique-tournament/17/season/${season}/rounds`
  );
  return response.data;
};
