import redisClient from "../configs/redis.js";

export const getTicketByMatchId = async (req, res) => {
  const { uid, matchId } = req.params;
  const redis = await redisClient();
  if (!matchId) {
    return res.status(404).json({ message: "Ticket match not found" });
  }
  try {
    const ticket = await redis.json.get(`uid:${uid}:match:${matchId}`, "$");
    return res.status(200).json({
      uid,
      matchId,
      tickets: ticket,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createTicket = async (req, res) => {
  const { uid, matchId, seasonId, round } = req.body;
  const now = new Date().getTime();
  const redis = await redisClient();
  try {
    const existingTicket = await redis.json.get(
      `uid:${uid}:match:${matchId}`,
      "$"
    );
    const data = await redis.json.set(`uid:${uid}:match:${matchId}`, "$", {
      uid,
      matchId,
      seasonId,
      round,
      created_at: now,
    });
    if (existingTicket) {
      return res.status(400).json({
        message: "You already have a ticket for this match",
        ticket: existingTicket,
      });
    }

    return res.status(201).json({
      data,
      message: "Ticket booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelTicket = async (req, res) => {
  const { uid, matchId } = req.params;
  const redis = await redisClient();
  if (!uid || !matchId) {
    return res.status(404).json({ message: "User or match not found" });
  }
  try {
    const cancel = await redis.json.del(`uid:${uid}:match:${matchId}`, "$");
    return res.status(200).json({ cancel, message: "Cancel ticket success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
