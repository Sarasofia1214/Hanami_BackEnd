// Controllers/authController.js
import { getUserByEmail, comparePassword, createUser } from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("JWT_SECRET no configurado en variables de entorno");
  process.exit(1);
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "Email ya registrado" });

    const user = await createUser({ name, email, password, role: "customer" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error("Error en signup:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
