import pool from "../Config/db.js";
import Joi from "joi";
import bcrypt from "bcrypt";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

export const validateLogin = (data) => {
  return loginSchema.validate(data);
};

// Buscar usuario por email
export const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Comparar contraseñas
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
