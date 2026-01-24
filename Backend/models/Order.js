import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    image: {
      type: String,
      default: "", // Optional, defaults to empty string
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: 1,
    },
  },
  { _id: false } // Prevent automatic _id for each order item
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    orderItems: [orderItemSchema],

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Completed", "Cancelled"],
      default: "Pending",
    },

    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
