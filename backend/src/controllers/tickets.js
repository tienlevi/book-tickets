import redisClient from "../configs/redis.js";
import { REDIS_KEY } from "../constants/key.js";

export const getTicketsByMatchId = async (req, res) => {};

export const createTicket = async (req, res) => {
  const { uid, matchId, seasonId, round } = req.body;
  const now = new Date().getTime();
  const redis = await redisClient();
  try {
    const tickets = await redis.lrange(REDIS_KEY.TICKETS, 0, -1);

    const existingTicket = tickets.find(
      (ticket) =>
        ticket.uid === uid &&
        ticket.matchId === matchId &&
        ticket.round === round
    );

    if (existingTicket) {
      return res.status(400).json({
        message: "You already have a ticket for this match",
        ticket: existingTicket,
      });
    }

    const newTicket = {
      uid,
      matchId,
      seasonId,
      round,
      created_at: now,
    };

    await redis.lpush(REDIS_KEY.TICKETS, JSON.stringify(newTicket));

    return res.status(201).json({
      message: "Ticket booked successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelTicket = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
