import { fotmobApi } from "../configs/axios.js";

export const fetchLeague = async (season) => {
  const formatSeasonText = encodeURIComponent(season.replace("-", "/")); // example: 2025-2026

  const response = await fotmobApi.get(
    `/data/leagues?id=47&ccode3=VNM&season=${formatSeasonText}`,
  );
  return response.data;
};
