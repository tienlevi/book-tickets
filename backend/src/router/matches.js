import express from "express";
import { getMatchesByRound } from "../controllers/matches.js";

const matchRouter = express.Router();

matchRouter.get("/matches/:round/season/:season", getMatchesByRound);

export default matchRouter;
