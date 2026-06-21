import express from "express";
import {
  registerUser,
  authUser,
  registerAdmin,
  authAdmin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/register-admin", registerAdmin);
router.post("/login-admin", authAdmin);

export default router;
