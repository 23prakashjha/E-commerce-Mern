import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ================= GET CART =================
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // assuming `protect` middleware sets req.user
    if (!userId) return res.status(400).json({ message: "User not found" });

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.json([]); // empty cart

    res.json(cart.items);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// ================= ADD TO CART =================
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: "productId and quantity >= 1 are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(201).json(cart.items);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// ================= UPDATE CART ITEM =================
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined || quantity < 1) {
      return res
        .status(400)
        .json({ message: "productId and quantity >= 1 are required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index < 0) return res.status(404).json({ message: "Product not in cart" });

    cart.items[index].quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    res.json(cart.items);
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

// ================= REMOVE CART ITEM =================
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params; // get productId from URL

    if (!productId) return res.status(400).json({ message: "productId is required" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();
    await cart.populate("items.product");

    res.json(cart.items);
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Failed to remove cart item" });
  }
};
