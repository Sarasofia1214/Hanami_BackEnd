import express from "express";
import dishRoutes from "./Routes/dishRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import ingredientRoutes from "./Routes/ingredientRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cors from "cors";

// Fix para rutas en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());


app.use("/dishes", dishRoutes);
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use(cors());
// Cargar el swagger generado automáticamente
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "swagger", "swaggerAuto.json"), "utf8")
    )
  )
)



export default app;




