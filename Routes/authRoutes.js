import express from "express";
import { loginUser } from "../Controllers/authController.js";

const router = express.Router();
// LOGIN
router.post("/login", loginUser);

export default router;