import {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
  validateDish,
} from "../Models/dishModel.js";

// Obtener todos los platos
export const getDishes = async (req, res) => {
  try {
    const dishes = await getAllDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: "Error getting dishes" });
  }
};

// Obtener plato por ID
export const getDish = async (req, res) => {
  try {
    const dish = await getDishById(req.params.id);

    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: "Error getting dish" });
  }
};

// Crear nuevo plato
export const addDish = async (req, res) => {
  try {
    const { error } = validateDish(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newDish = await createDish(req.body);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: "Error creating dish" });
  }
};

// Actualizar plato
export const editDish = async (req, res) => {
  try {
    const { error } = validateDish(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await updateDish(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating dish" });
  }
};

// Eliminar plato
export const removeDish = async (req, res) => {
  try {
    const result = await deleteDish(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error deleting dish" });
  }
};
