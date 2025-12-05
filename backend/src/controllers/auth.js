import jwt from "jsonwebtoken";
import redisClient from "../configs/redis.js";
import admin from "../configs/firebase.js";
import { REDIS_KEY } from "../constants/key.js";

export const login = async (req, res) => {
  try {
    const authHeader = req.headers.authorization?.split("Bearer ")[1];

    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Missing or invalid authorization header",
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(authHeader);
    const { uid, name, email, picture } = decodedToken;

    const redis = await redisClient();
    const usersAuth = (await admin.auth().listUsers()).users;
    const users = await redis.lrange(REDIS_KEY.USERS, 0, -1);
    const findUser =
      usersAuth.find((user) => user.uid === uid) &&
      users.find((user) => user.uid === uid);

    if (!findUser) {
      await redis.lpush(
        REDIS_KEY.USERS,
        JSON.stringify({ uid, name, email, picture })
      );
    }

    const tokens = jwt.sign(
      { uid, name, email, picture },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: "login success",
      tokens,
      user: {
        uid,
        name,
        email,
        picture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Invalid or expired token",
    });
  }
};
