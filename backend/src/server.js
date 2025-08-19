import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import uploadRoutes from "./routes/upload.route.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        undefined, // allow non-browser tools
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ];
      if (!origin || allowed.includes(origin)) return callback(null, true);
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    },
    credentials: true, // allow frontend to send cookies
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/uploads", uploadRoutes);

// serve uploaded avatars statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
