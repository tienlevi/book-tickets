import express from "express";
import redisClient from "../configs/redis.js";
const productsRouter = express.Router();

productsRouter.get("/products", async (req, res) => {
  const redis = await redisClient();
  const products = await redis.lindex("products", 0);

  return res.json({
    products,
    message: "Products fetched successfully",
    status: "success",
  });
});

export default productsRouter;
