import { getMatches } from "../services/matches.js";
import { getSeasons } from "../services/seasons.js";

export const getSeasonsController = async (req, res) => {
  try {
    const response = await getSeasons();
    return res.status(200).json(response.seasons);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getMatchesController = async (req, res) => {
  const { seasonId, round } = req.params;
  try {
    const response = await getMatches(seasonId, round);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
