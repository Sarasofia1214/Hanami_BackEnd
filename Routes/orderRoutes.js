import express from "express";
import {
  createNewOrder,
  listOrders,
  getOrder,
  updateStatus,
  removeOrder,
} from "../Controllers/orderController.js";

import { authRequired, adminRequired } from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authRequired, createNewOrder);
router.get("/", authRequired, adminRequired, listOrders);
router.get("/:id", authRequired, getOrder);
router.put("/:id/status", authRequired, adminRequired, updateStatus);
router.delete("/:id", authRequired, adminRequired, removeOrder);

export default router;
