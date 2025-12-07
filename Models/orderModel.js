import pool from "../Config/db.js";
import Joi from "joi";

const orderItemSchema = Joi.object({
  dish_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const orderSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  status: Joi.string().valid("pending", "preparing", "delivered").default("pending"),
  items: Joi.array().items(orderItemSchema).min(1).required(),
});

export const validateOrder = (data) => orderSchema.validate(data);

export const createOrder = async ({ user_id, status }) => {
  const [result] = await pool.query(
    "INSERT INTO orders (user_id, status) VALUES (?, ?)",
    [user_id, status]
  );

  return { id: result.insertId, user_id, status };
};

// Insertar items
export const insertOrderItems = async (orderId, items) => {
  const values = items.map(item => [orderId, item.dish_id, item.quantity]);

  await pool.query(
    "INSERT INTO order_items (order_id, dish_id, quantity) VALUES ?",
    [values]
  );
};

// Obtener todas las órdenes
export const getAllOrders = async () => {
  const [rows] = await pool.query("SELECT * FROM orders");
  return rows;
};

// Obtener orden con items
export const getOrderById = async (id) => {
  const [[order]] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);

  if (!order) return null;

  const [items] = await pool.query(
    "SELECT dish_id, quantity FROM order_items WHERE order_id = ?",
    [id]
  );

  return { ...order, items };
};

// Actualizar estado
export const updateOrderStatus = async (id, status) => {
  await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  return { id, status };
};

// Eliminar orden
export const deleteOrder = async (id) => {
  await pool.query("DELETE FROM order_items WHERE order_id = ?", [id]);
  await pool.query("DELETE FROM orders WHERE id = ?", [id]);

  return { message: "Order deleted successfully" };
};
