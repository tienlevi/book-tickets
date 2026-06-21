import express from "express";
import { getMatch, getMatchesByRound } from "../controllers/matches.js";

const matchRouter = express.Router();

matchRouter.get("/matches/round/:round/season/:season", getMatchesByRound);
matchRouter.get("/matches/:id", getMatch);

export default matchRouter;
