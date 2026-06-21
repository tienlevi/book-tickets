import { fotmobApi } from "../configs/axios.js";

export const getMatchById = async (id) => {
  const response = await fotmobApi.get(`/data/matchDetails?matchId=${id}`);
  return response.data;
};
