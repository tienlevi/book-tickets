import express from "express";
import { getSeasonsController } from "../controllers/matches.js";

const matchRouter = express.Router();

matchRouter.get("/seasons", getSeasonsController);

export default matchRouter;
