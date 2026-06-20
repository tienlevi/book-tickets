import express from "express";
import { getAvailableSeasons, getSeasons } from "../controllers/seasons.js";

const seasonRouter = express.Router();

seasonRouter.get("/available-seasons", getAvailableSeasons);
seasonRouter.get("/seasons", getSeasons);

export default seasonRouter;
