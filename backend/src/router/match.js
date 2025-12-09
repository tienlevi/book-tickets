import express from "express";
import {
  getMatcheByIdController,
  getMatchesController,
  getRoundsController,
  getSeasonsController,
} from "../controllers/matches.js";

const matchRouter = express.Router();

matchRouter.get("/seasons", getSeasonsController);
matchRouter.get("/rounds/:seasonId", getRoundsController);
matchRouter.get("/match/:seasonId/round/:round", getMatchesController);
matchRouter.get("/match/:matchId", getMatcheByIdController);

export default matchRouter;
