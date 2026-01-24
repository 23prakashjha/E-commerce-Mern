import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ================= PRODUCTS ROUTES ================= */

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Create product with images
router.post("/", upload.array("images", 5), createProduct);

// Update product (replace images if provided)
router.put("/:id", upload.array("images", 5), updateProduct);

// Delete product
router.delete("/:id", deleteProduct);

export default router;

