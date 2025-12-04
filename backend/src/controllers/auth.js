import jwt from "jsonwebtoken";
import redisClient from "../configs/redis.js";
import admin from "../configs/firebase.js";

export const login = async (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  const { uid, email, name, avatar } = decodedToken;

  const redis = await redisClient();
  const users = (await admin.auth().listUsers()).users;
  const findUser = users.find((user) => user.uid === uid);
  if (!findUser) {
    const createUser = await redis.linsert("users", 0, -1);
  }
  return res.json({
    status: "success",
  });
};
