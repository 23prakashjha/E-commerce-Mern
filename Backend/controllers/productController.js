import Product from "../models/Product.js";
import fs from "fs";
import path from "path";

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= GET SINGLE PRODUCT ================= */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, countInStock } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // ✅ STORE RELATIVE PATHS (NO LEADING SLASH)
    const images = req.files.map(
      (file) => `uploads/${file.filename}`
    );

    const product = await Product.create({
      name,
      price,
      category,
      description: description || "",
      countInStock: countInStock || 0,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, countInStock } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.countInStock = countInStock ?? product.countInStock;

    // Replace images if new ones uploaded
    if (req.files && req.files.length > 0) {
      // 🧹 Delete old images safely
      product.images.forEach((imgPath) => {
        const filePath = path.join(process.cwd(), imgPath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      product.images = req.files.map(
        (file) => `uploads/${file.filename}`
      );
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // 🧹 Delete images from disk
    product.images.forEach((imgPath) => {
      const filePath = path.join(process.cwd(), imgPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



