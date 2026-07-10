import Product from "../models/Product.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../middleware/upload.js";

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
    const { name, price, discountPrice, category, description, countInStock, rating, numReviews } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ message: "Cloudinary is not configured. Set CLOUDINARY env variables on your server." });
    }

    let uploadResults;
    try {
      uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file))
      );
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      return res.status(500).json({ message: "Image upload failed: " + uploadErr.message });
    }

    const images = uploadResults.map((result) => result.secure_url);

    const product = await Product.create({
      name,
      price,
      discountPrice: discountPrice || 0,
      category,
      description: description || "",
      countInStock: countInStock || 0,
      rating: rating || 0,
      numReviews: numReviews || 0,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const { name, price, discountPrice, category, description, countInStock, rating, numReviews } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.discountPrice = discountPrice ?? product.discountPrice;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.countInStock = countInStock ?? product.countInStock;
    product.rating = rating ?? product.rating;
    product.numReviews = numReviews ?? product.numReviews;

    if (req.files && req.files.length > 0) {
      await Promise.all(product.images.map((url) => deleteFromCloudinary(url)));

      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file))
      );

      product.images = uploadResults.map((result) => result.secure_url);
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

    await Promise.all(product.images.map((url) => deleteFromCloudinary(url)));

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
