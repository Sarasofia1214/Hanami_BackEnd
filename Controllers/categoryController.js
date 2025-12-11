import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  validateCategory,
} from "../Models/categoryModel.js";


// GET /categories
export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories(); // Llama al modelo para leer de la BD
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error getting categories" });
  }
};
// Devuelve una categoría por su id
export const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    // Si no existe,
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // 200 con la categoría encontrada.
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error getting category" });
  }
};

// POST /categories
export const addCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

// PUT /categories/:id
export const editCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await updateCategory(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// DELETE /categories/:id
export const removeCategory = async (req, res) => {
  try {
    const result = await deleteCategory(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
