// funciones de acceso a datos del usuario: login y signup
import { getUserByEmail, comparePassword, createUser } from "../Models/userModel.js";
// Librería de verificacion JWT.
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// si no hay JWT_SECRET la app se detiene.
if (!JWT_SECRET) {
  console.error("JWT_SECRET no configurado en variables de entorno");
  process.exit(1);
}

// LOGIN, recibe email y password, verifica credenciales y devuelve un JWT si son correctas.
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email y contraseña requeridos" });
    }
    // Buscar usuario por email.
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "usuario no encontrado" });

    // Compara la contraseña recibida con el hash almacenado.
    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "contraseña incorrecta" });


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
      return res.status(400).json({ message: "Todos los campos obligatorios" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "Email ya registrado" });
    // El role predeterminado es de customer
    const user = await createUser({ name, email, password, role: "customer" });

    // Generar token JWT para el nuevo usuario.
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
