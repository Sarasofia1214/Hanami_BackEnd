// Models/userModel.js

import pool from "../Config/db.js";
import Joi from "joi";
import bcrypt from "bcrypt";

// Esquema de validación de usuario (signup)
const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(), 
  role: Joi.string().valid("admin", "customer").default("customer"),
});

// Validación de usuario
export const validateUser = (data) => userSchema.validate(data);

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const [rows] = await pool.query(`
    SELECT id, name, email, role, created_at 
    FROM users
  `);
  return rows;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

// Crear nuevo usuario (signup)
export const createUser = async ({ name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, ?)`,
    [name, email, hashedPassword, role]
  );

  return {
    id: result.insertId,
    name,
    email,
    role,
  };
};

// Comparar contraseña para login
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Actualizar usuario
export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.email) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.role) {
    fields.push("role = ?");
    values.push(data.role);
  }
  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    fields.push("password = ?");
    values.push(hashedPassword);
  }

  if (fields.length === 0) return false;

  values.push(id);

  await pool.query(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values
  );

  return await getUserById(id);
};

// Eliminar usuario
export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return { message: "User deleted successfully" };
};
