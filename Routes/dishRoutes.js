import { Router } from "express";
import {
  getDishes,
  getDish,
  addDish,
  editDish,
  removeDish,
} from "../Controllers/dishController.js";

// crea un router para las rutas de platos
const router = Router();

router.get("/", getDishes);
router.get("/:id", getDish);
router.post("/", addDish);
router.put("/:id", editDish);
router.delete("/:id", removeDish);

export default router;
