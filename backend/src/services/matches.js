import { sofascoreApi } from "../configs/axios.js";

export const getMatches = async (seasonId, round) => {
  const response = await sofascoreApi.get(
    `/unique-tournament/17/season/${seasonId}/events/round/${round}`
  );
  return response.data;
};
