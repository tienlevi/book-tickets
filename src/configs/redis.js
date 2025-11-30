import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

async function redisClient() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  console.log("URL: ", process.env.UPSTASH_REDIS_REST_URL);
  console.log("Token: ", process.env.UPSTASH_REDIS_REST_TOKEN);

  console.log("Connected to Redis successfully");

  return redis;
}

export default redisClient;
