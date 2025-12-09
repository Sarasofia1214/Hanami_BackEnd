import pool from "../Config/db.js";
import Joi from "joi";

// ==============================
// Joi Schema
// ==============================
const ingredientSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  quantity: Joi.string().max(100).required(),
  unit: Joi.string().max(50).allow("", null),
  dish_id: Joi.number().integer().required(),
});

// Validación pública
export const validateIngredient = (data) => {
  return ingredientSchema.validate(data);
};

// ==============================
// Métodos SQL
// ==============================

// Obtener todos
export const getAllIngredients = async () => {
  const [rows] = await pool.query("SELECT * FROM ingredients");
  return rows;
};

// Obtener uno por ID
export const getIngredientById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM ingredients WHERE id = ?", [id]);
  return rows[0];
};

// Obtener ingredientes por plato
export const getIngredientsByDishId = async (dish_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM ingredients WHERE dish_id = ?",
    [dish_id]
  );
  return rows;
};

// Crear
export const createIngredient = async (data) => {
  const { name, quantity, unit, dish_id } = data;

  const [result] = await pool.query(
    `INSERT INTO ingredients (name, quantity, unit, dish_id) 
     VALUES (?, ?, ?, ?)`,
    [name, quantity, unit, dish_id]
  );

  return {
    id: result.insertId,
    name,
    quantity,
    unit,
    dish_id,
  };
};

// Actualizar
export const updateIngredient = async (id, data) => {
  const { name, quantity, unit, dish_id } = data;

  await pool.query(
    `UPDATE ingredients 
     SET name = ?, quantity = ?, unit = ?, dish_id = ? 
     WHERE id = ?`,
    [name, quantity, unit, dish_id, id]
  );

  return { id, name, quantity, unit, dish_id };
};

// Eliminar
export const deleteIngredient = async (id) => {
  await pool.query("DELETE FROM ingredients WHERE id = ?", [id]);

  return { message: "Ingredient deleted successfully" };
};