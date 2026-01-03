import express from "express";
import {
  cancelTicket,
  createTicket,
  getTicketByMatchId,
  getTicketsByUser,
} from "../controllers/tickets.js";

const ticketRouter = express.Router();

ticketRouter.get("/tickets");
ticketRouter.get("/ticket/:uid", getTicketsByUser);
ticketRouter.get("/ticket/:uid/match/:matchId", getTicketByMatchId);
ticketRouter.post("/ticket", createTicket);
ticketRouter.delete("/ticket/:uid/match/:matchId", cancelTicket);

export default ticketRouter;
