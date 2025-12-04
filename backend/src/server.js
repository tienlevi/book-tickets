import express from "express";
import bodyParser from "body-parser";
import userRouter from "./router/users.js";
import authRouter from "./router/auth.js";
import matchRouter from "./router/matches.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Express.js Server",
    status: "success",
  });
});
app.use("/api/v1", userRouter);
app.use("/api/v1", matchRouter);
app.use("/api/v1", authRouter);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
