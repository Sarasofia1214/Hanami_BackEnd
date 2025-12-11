import express from "express";
import { login, signup } from "../Controllers/authController.js";

// Instancia de Express para agrupar las rutas de auth.
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
