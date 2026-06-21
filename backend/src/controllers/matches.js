import { fetchLeague } from "../services/leagues.js";
import { getMatchById } from "../services/matches.js";

export const getMatchesByRound = async (req, res) => {
  const { season, round } = req.params;

  if (!season || !round) {
    return res.status(400).json({ message: "seasonId and round are required" });
  }

  try {
    const data = await fetchLeague(season);
    const matches =
      data.fixtures.allMatches.filter((match) => match.round === round) || [];
    const currentRound = data.fixtures.fixtureInfo.activeRound;

    return res.status(200).json({ matches, currentRound });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getMatch = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await getMatchById(id);

    return res.status(200).json({
      ...data.general,
      location: data.content.matchFacts.infoBox.Stadium.name,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
