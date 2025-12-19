import jwt from "jsonwebtoken";
import admin from "../configs/firebase.js";

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
