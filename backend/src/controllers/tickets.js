import redisClient from "../configs/redis.js";

export const getTicketByMatchId = async (req, res) => {
  const { uid, matchId } = req.params;
  const redis = await redisClient();
  if (!uid) {
    return res.status(404).json({ message: "User not found" });
  }
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

export const getTicketsByUser = async (req, res) => {
  const { uid } = req.params;
  const redis = await redisClient();
  if (!uid) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const [cursor, keys] = await redis.scan(0, {
      count: 50,
      match: `uid:${uid}:*`,
    });

    if (!keys || keys.length === 0) {
      return res.status(200).json({
        uid,
        tickets: [],
        keys: [],
        cursor,
      });
    }

    const list = keys.map((key) => redis.json.get(key));

    const tickets = await Promise.all(list || []);

    return res.status(200).json({
      uid,
      tickets,
      keys,
      cursor,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
