import { sofascoreApi } from "../configs/axios.js";

export const getRounds = async (season) => {
  const response = await sofascoreApi.get(
    `/unique-tournament/17/season/${season}/rounds`
  );
  return response.data;
};
