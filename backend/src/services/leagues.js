import { fotmobApi } from "../configs/axios.js";

export const fetchLeague = async (season) => {
  const response = await fotmobApi.get(
    `/data/leagues?id=47&ccode3=VNM&season=${season}`,
  );
  return response.data;
};
