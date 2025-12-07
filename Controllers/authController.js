import jwt from "jsonwebtoken";
import { getUserByEmail, comparePassword, validateLogin } from "../Models/authModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";
const JWT_EXPIRES = "7d";

// LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const isValid = await comparePassword(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Credenciales incorrectas" });


    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};
