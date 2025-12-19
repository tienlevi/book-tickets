import express from "express";
import { cancelTicket, createTicket } from "../controllers/tickets.js";

const ticketRouter = express.Router();

ticketRouter.get("/tickets");
ticketRouter.post("/ticket", createTicket);
ticketRouter.delete("/ticket/:uid/match/:matchId", cancelTicket);

export default ticketRouter;
