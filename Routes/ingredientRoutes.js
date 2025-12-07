import { Router } from "express";

import {
  getIngredients,
  getIngredient,
  getIngredientsFromDish,
  createNewIngredient,
  updateExistingIngredient,
  deleteIngredientById
} from "../Controllers/ingredientController.js";

const router = Router();

router.get("/", getIngredients);
router.get("/:id", getIngredient);
router.get("/dish/:dish_id", getIngredientsFromDish);
router.post("/", createNewIngredient);
router.put("/:id", updateExistingIngredient);
router.delete("/:id", deleteIngredientById);

export default router;
