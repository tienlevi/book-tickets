import express from "express";
import { getUserByUid, getUsers } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/users/:uid", getUserByUid);
userRouter.get("/users", getUsers);

export default userRouter;
