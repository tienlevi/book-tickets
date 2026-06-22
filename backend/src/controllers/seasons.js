import { fetchLeague } from "../services/leagues.js";

export const getAvailableSeasons = async (req, res) => {
  try {
    const data = await fetchLeague();
    return res.status(200).json(data.allAvailableSeasons);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getSeasons = async (req, res) => {
  try {
    const data = await fetchLeague();
    return res.status(200).json(data.seasons);
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
