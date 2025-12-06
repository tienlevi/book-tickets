import { getSeasons } from "../services/seasons.js";

export const getSeasonsController = async (req, res) => {
  try {
    const response = await getSeasons();
    return res.status(200).json(response.seasons);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
