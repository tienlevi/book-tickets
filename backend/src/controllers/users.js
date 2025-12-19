import admin from "../configs/firebase.js";

export const getUsers = async (req, res) => {
  try {
    return res.status(200).json({
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
