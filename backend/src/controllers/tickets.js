import redisClient from "../configs/redis.js";
import { REDIS_KEY } from "../constants/key.js";

export const createTicket = async (req, res) => {
  const { name } = req.body;
  const redis = await redisClient();
  try {
    const ticket = await redis.lpush(REDIS_KEY.TICKETS, { name });
    return res.status(200).json({ ticket, message: "Create success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
