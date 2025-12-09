import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const authRequired = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Token no proporcionado" });

  const token = header.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido o expirado" });
    req.user = user;
    next();
  });
};

export const adminRequired = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "No autenticado" });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  next();
};
