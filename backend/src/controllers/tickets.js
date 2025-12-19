import redisClient from "../configs/redis.js";

export const getTicketsByMatchId = async (req, res) => {};

export const createTicket = async (req, res) => {
  const { uid, matchId, seasonId, round } = req.body;
  const now = new Date().getTime();
  const redis = await redisClient();
  try {
    if (existingTicket) {
      return res.status(400).json({
        message: "You already have a ticket for this match",
        ticket: existingTicket,
      });
    }

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
  const { uid, matchId } = req.params;
  console.log("🚀 ~ cancelTicket ~ matchId:", matchId);
  console.log("🚀 ~ cancelTicket ~ uid:", uid);
  const redis = await redisClient();
  try {
    if (!uid || !matchId) {
      return res.status(404).json({ message: "User or match not found" });
    }
    const cancel = await redis.lrem(
      REDIS_KEY.TICKETS,
      0,
      JSON.stringify({ uid, matchId })
    );
    redis.del;
    return res.status(200).json({ cancel, message: "Cancel ticket success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
