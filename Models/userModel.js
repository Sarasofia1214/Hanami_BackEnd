import pool from "../Config/db.js";
import bcrypt from "bcrypt";
import Joi from "joi";

// Validación login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
export const validateLogin = (data) => loginSchema.validate(data);

// Validación usuario (signup o actualización)
const userSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100), 
  role: Joi.string().valid("customer", "admin")
});
export const validateUser = (data) => userSchema.validate(data);

// Buscar usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};
// Crear usuario
export const createUser = async ({ name, email, password, role = "customer" }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );

  return { id: result.insertId, name, email, role };
};
// Comparar contraseña
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
// Listar todos los usuarios
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, created_at FROM users"
  );
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
// Actualizar usuario
export const updateUser = async (id, { name, email, role }) => {
  const [result] = await pool.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id]
  );
  return result.affectedRows;
};
// Eliminar usuario
export const deleteUser = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};
