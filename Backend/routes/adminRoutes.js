import express from "express";
import { protect, admin } from "../middleware/auth.js";
import { getUsers, deleteUser } from "../controllers/userController.js";
import Order from "../models/Order.js";

const router = express.Router();

router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

router.get("/orders", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/orders/:id/status", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.orderStatus = req.body.status || order.orderStatus;
    if (order.orderStatus === "Paid") order.paymentStatus = "Paid";
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
