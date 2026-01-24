import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

/* ================= CREATE ORDER ================= */
export const createOrder = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "name price image"
    );

    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      paymentMethod: req.body.paymentMethod || "COD",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    });

    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET LOGGED-IN USER ORDERS ================= */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET SPECIFIC ORDER STATUS ================= */
export const getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only owner can access
    if (req.user._id.toString() !== order.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({
      orderId: order._id,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
    });
  } catch (error) {
    console.error("GET ORDER STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow owner or admin to update
    if (req.user._id.toString() !== order.user.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
