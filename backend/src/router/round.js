import express from "express";
import { getRounds } from "../controllers/round.js";

const roundRouter = express.Router();

roundRouter.get("/rounds", getRounds);

export default roundRouter;
