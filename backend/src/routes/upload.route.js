import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Ensure upload directory exists
const __root = path.resolve();
const uploadBaseDir = path.join(__root, "uploads", "avatars");
fs.mkdirSync(uploadBaseDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadBaseDir);
  },
  filename: function (_req, file, cb) {
    const timestamp = Date.now();
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, `${timestamp}-${safeOriginal}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only image files are allowed"));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

router.post("/avatar", protectRoute, upload.single("avatar"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const publicUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
    return res.status(201).json({ url: publicUrl });
  } catch (error) {
    console.error("Upload error:", error.message);
    return res.status(500).json({ message: "Failed to upload avatar" });
  }
});

export default router;


