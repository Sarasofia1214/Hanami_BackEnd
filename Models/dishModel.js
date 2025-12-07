import pool from "../Config/db.js";
import Joi from "joi";

// Validación del los elemeentos de la tabla dishes 
const dishSchema = Joi.object({
  name: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().precision(2).required(),
  image_url: Joi.string().uri().allow("", null),
  category_id: Joi.number().integer().required(),
  is_available: Joi.boolean().default(true),
});


export const validateDish = (data) => {
  return dishSchema.validate(data);
};

// Obtener todos los platos
export const getAllDishes = async () => {
  const [rows] = await pool.query(`
    SELECT d.*, c.name AS category_name 
    FROM dishes d
    LEFT JOIN categories c ON d.category_id = c.id
  `);
  return rows;
};

// Obtener un plato por ID
export const getDishById = async (id) => {
  const [rows] = await pool.query(
    `SELECT d.*, c.name AS category_name 
     FROM dishes d
     LEFT JOIN categories c ON d.category_id = c.id
     WHERE d.id = ?`,
    [id]
  );
  return rows[0];
};

// Crear un plato
export const createDish = async (data) => {
  const { name, description, price, image_url, category_id, is_available } = data;

  const [result] = await pool.query(
    `INSERT INTO dishes (name, description, price, image_url, category_id, is_available) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, price, image_url, category_id, is_available]
  );

  return { id: result.insertId, ...data };
};

// Actualizar un plato
export const updateDish = async (id, data) => {
  const { name, description, price, image_url, category_id, is_available } = data;

  await pool.query(
    `UPDATE dishes 
     SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, is_available = ?
     WHERE id = ?`,
    [name, description, price, image_url, category_id, is_available, id]
  );

  return { id, ...data };
};

// Eliminar un plato
export const deleteDish = async (id) => {
  await pool.query(`DELETE FROM dishes WHERE id = ?`, [id]);
  return { message: "Dish deleted successfully" };
};
