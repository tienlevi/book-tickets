import express from "express";
import { createTicket } from "../controllers/tickets.js";

const ticketRouter = express.Router();

ticketRouter.get("/tickets");
ticketRouter.post("/ticket", createTicket);

export default ticketRouter;
