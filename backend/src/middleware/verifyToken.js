import admin from "../configs/firebase.js";

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    if (!token) {
      res.status(401).send({ message: "Token incorrect" });
    }
    const decodedToken = await admin.auth().verifyIdToken(token);

    const uid = decodedToken.uid;
    const email = decodedToken.email;

    console.log("Logged", email);

    res.status(200).send({ message: "Verify success", uid: uid, email: email });
  } catch (error) {
    res.status(500).send({ message: "Server Internal Error" });
  }
}

export default verifyToken;
