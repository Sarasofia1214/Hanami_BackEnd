import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import dishRoutes from "./Routes/dishRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import ingredientRoutes from "./Routes/ingredientRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import reservationRoutes from "./Routes/reservationRoutes.js";
import authRoutes from "./Routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas api
app.use("/auth", authRoutes);
app.use("/dishes", dishRoutes);
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/users", userRoutes);
app.use("/reservations", reservationRoutes);

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "swagger", "swaggerAuto.json"), "utf8")
    )
  )
);

export default app;
