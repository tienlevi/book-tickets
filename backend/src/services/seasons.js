import { sofascoreApi } from "../configs/axios.js";

export const getSeasons = async () => {
  try {
    const response = await sofascoreApi.get(`/unique-tournament/17/seasons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching seasons:", error.message);
    throw error;
  }
};
