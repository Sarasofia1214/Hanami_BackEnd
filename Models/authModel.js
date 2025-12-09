import pool from "../Config/db.js";
import Joi from "joi";
import bcrypt from "bcrypt";

// Esquema de validación para login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

// Validación del login
export const validateLogin = (data) => loginSchema.validate(data);

// Buscar usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Crear usuario (para signup futuro)
export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [userData.name, userData.email, hashedPassword, userData.role || "user"]
  );
  return { id: result.insertId, ...userData, password: undefined };
};

// Comparar contraseña
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
