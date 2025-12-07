// Routes/userRoutes.js

import { Router } from "express";

import {
  getUsers,
  getSingleUser,
  createNewUser,
  updateExistingUser,
  deleteUserById,
} from "../Controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.post("/", createNewUser);
router.put("/:id", updateExistingUser);
router.delete("/:id", deleteUserById);

export default router;
