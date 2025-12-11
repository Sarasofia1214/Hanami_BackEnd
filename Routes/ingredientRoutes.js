import { Router } from "express";

import {
  getIngredients,
  getIngredient,
  getIngredientsFromDish,
  createNewIngredient,
  updateExistingIngredient,
  deleteIngredientById
} from "../Controllers/ingredientController.js";

// Crea un router para Ingredient
const router = Router();

router.get("/", getIngredients);
router.get("/dish/:dish_id", getIngredientsFromDish);
router.get("/:id", getIngredient);
router.post("/", createNewIngredient);
router.put("/:id", updateExistingIngredient);
router.delete("/:id", deleteIngredientById);

export default router;
