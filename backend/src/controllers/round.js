import { fetchLeague } from "../services/leagues.js";

export const getRounds = async (req, res) => {
  const { season } = req.query;

  try {
    const data = await fetchLeague(season);

    const currentRound = data.fixtures.fixtureInfo.activeRound;
    const rounds = data.fixtures.fixtureInfo.rounds;

    return res.status(200).json({ currentRound, rounds });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
