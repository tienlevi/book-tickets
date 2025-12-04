import express from "express";
import { createTicket } from "../controllers/tickets.js";

const matchRouter = express.Router();

matchRouter.get("/matches");
matchRouter.post("/matches", createTicket);

export default matchRouter;
