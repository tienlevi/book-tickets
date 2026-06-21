import { fotmobApi } from "../configs/axios.js";

export const fetchLeague = async (season) => {
  const formatSeasonText = season
    ? encodeURIComponent(season.replace("-", "/"))
    : ""; // example: 2025-2026

  const response = await fotmobApi.get(
    `/data/leagues?id=47&ccode3=VNM${season && `&season=${formatSeasonText}`}`,
  );
  return response.data;
};
