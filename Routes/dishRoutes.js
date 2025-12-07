import { Router } from "express";
import {
  getDishes,
  getDish,
  addDish,
  editDish,
  removeDish,
} from "../Controllers/dishController.js";

const router = Router();

router.get("/", getDishes);
router.get("/:id", getDish);
router.post("/", addDish);
router.put("/:id", editDish);
router.delete("/:id", removeDish);

export default router;
