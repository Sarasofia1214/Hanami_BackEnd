import pool from "../Config/db.js";
import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("", null),
});

// Validación pública
export const validateCategory = (data) => {
  return categorySchema.validate(data);
};

// Métodos SQL
export const getAllCategories = async () => {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0];
};

export const createCategory = async (data) => {
  const { name, description } = data;

  const [result] = await pool.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description]
  );

  return { id: result.insertId, name, description };
};

export const updateCategory = async (id, data) => {
  const { name, description } = data;

  await pool.query(
    "UPDATE categories SET name = ?, description = ? WHERE id = ?",
    [name, description, id]
  );

  return { id, name, description };
};

export const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = ?", [id]);
  return { message: "Category deleted successfully" };
};
