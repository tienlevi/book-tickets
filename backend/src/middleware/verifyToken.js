import admin from "../configs/firebase.js";

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    if (!token) {
      res.status(401).send({ message: "Token incorrect" });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);

    const { uid, name, email, picture } = decodedToken;

    res
      .status(200)
      .json({ message: "Verify success", uid, name, email, picture });
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
  }
}

export default verifyToken;
