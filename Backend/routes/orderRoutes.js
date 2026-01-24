import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderStatus,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create a new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/myorders", protect, getUserOrders);

// Get specific order status
router.get("/:id/status", protect, getOrderStatus);

// Update order status
router.put("/:id/status", protect, updateOrderStatus);

export default router;
