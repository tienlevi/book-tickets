import redisClient from "../configs/redis.js";
import admin from "../configs/firebase.js";
import { REDIS_KEY } from "../constants/key.js";

export const getUsers = async (req, res) => {
  try {
    const redis = await redisClient();
    const users = await redis.lrange(REDIS_KEY.USERS, 0, -1);
    const usersAuthResult = await admin.auth().listUsers();
    const usersAuth = usersAuthResult.users;

    return res.status(200).json({
      users,
      usersAuth,
      message: "Users fetched successfully",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.user;
    const user = await admin.auth().getUser(uid);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
