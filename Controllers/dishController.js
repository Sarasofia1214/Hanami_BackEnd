import {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
  validateDish,
} from "../Models/dishModel.js";

// GET /dishes
export const getDishes = async (req, res) => {
  try {
    const dishes = await getAllDishes();
    return res.json(dishes);
  } catch (err) {
    console.error("Error al obtener platos:", err);
    return res.status(500).json({ message: "Error al obtener los platos" });
  }
};

// GET /dishes/:id
export const getDish = async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await getDishById(id);

    if (!dish) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    return res.json(dish);
  } catch (err) {
    console.error("Error al obtener plato:", err);
    return res.status(500).json({ message: "Error al obtener el plato" });
  }
};

// POST /dishes
export const addDish = async (req, res) => {
  try {
    // Validar body con Joi
    const { error, value } = validateDish(req.body);

    if (error) {
      return res.status(400).json({
        message: "Datos inválidos",
        details: error.details.map((d) => d.message),
      });
    }

    // Crear plato
    const newDish = await createDish(value);
    return res.status(201).json(newDish);
  } catch (err) {
    console.error("Error al crear plato:", err);
    return res.status(500).json({ message: "Error al crear el plato" });
  }
};

// PUT /dishes/:id
export const editDish = async (req, res) => {
  try {
    const { id } = req.params;

    // Valida body con Joi
    const { error, value } = validateDish(req.body);

    if (error) {
      return res.status(400).json({
        message: "Datos inválidos",
        details: error.details.map((d) => d.message),
      });
    }

    // Verifica que el plato existe
    const existing = await getDishById(id);
    if (!existing) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    // Actualizar plato
    const updated = await updateDish(id, value);
    return res.json(updated);
  } catch (err) {
    console.error("Error al actualizar plato:", err);
    return res.status(500).json({ message: "Error al actualizar el plato" });
  }
};

// DELETE /dishes/:id
export const removeDish = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica que el plato existe antes de borarlo
    const existing = await getDishById(id);
    if (!existing) {
      return res.status(404).json({ message: "Plato no encontrado" });
    }

    await deleteDish(id);
    return res.json({ message: "Plato eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar plato:", err);
    return res.status(500).json({ message: "Error al eliminar el plato" });
  }
};
