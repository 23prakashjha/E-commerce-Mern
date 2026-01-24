import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { connectDB } from "./db.js";

/* ================= ROUTES ================= */
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

/* ================= CONFIG ================= */
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DATABASE ================= */
connectDB();

/* ================= EXPRESS APP ================= */
const app = express();

/* ================= UPLOADS DIRECTORY ================= */
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* ================= MIDDLEWARE ================= */
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

/* Serve uploaded images */
app.use("/uploads", express.static(uploadsDir));

/* ================= API ROUTES ================= */
app.use("/api/auth", authRoutes);          // Authentication routes
app.use("/api/products", productRoutes);  // Products routes
app.use("/api/cart", cartRoutes);         // Cart routes
app.use("/api/orders", orderRoutes);      // Orders routes
app.use("/api/payments", paymentRoutes);  // Payments routes

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("✅ API is running successfully...");
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack || err);
  res.status(500).json({
    message: err.message || "Server Error",
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
