import { sofascoreApi } from "../configs/axios";

export const getSeasons = async () => {
  const response = await sofascoreApi.get(`/unique-tournament/17/seasons`);
  return response.data;
};
