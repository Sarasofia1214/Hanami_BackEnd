import {
  validateIngredient,
  getAllIngredients,
  getIngredientById,
  getIngredientsByDishId,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../Models/ingredientModel.js";

// Devuelve todos los ingredientes
export const getIngredients = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ingredients" });
  }
};

// GET /ingredients/:id
export const getIngredient = async (req, res) => {
  try {
    const ingredient = await getIngredientById(req.params.id);

    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Error fetching ingredient" });
  }
};

// /ingredients/dish/:dish_id
export const getIngredientsFromDish = async (req, res) => {
  try {
    const ingredients = await getIngredientsByDishId(req.params.dish_id);
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching dish ingredients" });
  }
};

// Crear ingrediente
export const createNewIngredient = async (req, res) => {
  try {
    const { error } = validateIngredient(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const ingredient = await createIngredient(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Error creating ingredient" });
  }
};

// PUT ingredients/:id
export const updateExistingIngredient = async (req, res) => {
  try {
    const existing = await getIngredientById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
 // Validacion de los nuevos datos
    const { error } = validateIngredient(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updated = await updateIngredient(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating ingredient" });
  }
};

// eliminar ingrediente
export const deleteIngredientById = async (req, res) => {
  try {
    const existing = await getIngredientById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Ingredient not found" });
    }

    await deleteIngredient(req.params.id);
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting ingredient" });
  }
};
