import express from "express";
import dishRoutes from "./Routes/dishRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import ingredientRoutes from "./Routes/ingredientRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
const app = express();


app.use(express.json());

app.use("/dishes", dishRoutes);
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

export default app;




