import express from "express";
import { login } from "../controllers/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.get("/auth", verifyToken);
authRouter.post("/login", login);

export default authRouter;
