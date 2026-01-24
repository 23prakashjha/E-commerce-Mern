import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    images: {
      type: [String], // Array of image paths or URLs
      required: [true, "At least one product image is required"],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one image is required",
      },
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      default: "Uncategorized",
    },
    countInStock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;



