import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Autenticacion con un token válido
export const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  // si en el Header no esta autorization es porque no esta autenticado
  if (!header) return res.status(401).json({ message: "Token no proporcionado" });

  const token = header.split(" ")[1]; // Se extrae el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    // guarda la info del usuario en req.user para usarla en los controladores
    req.user = user;
    next();
  });
};

// Verifica la exigencia del rol admin
export const adminRequired = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No autenticado" });
  // Solo permite acceso si el rol del usuario es "admin".
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  next();
};
