import express from "express";
import {
  getMatchesController,
  getSeasonsController,
} from "../controllers/matches.js";

const matchRouter = express.Router();

matchRouter.get("/seasons", getSeasonsController);
matchRouter.get("/match/:seasonId/round/:round", getMatchesController);

export default matchRouter;
