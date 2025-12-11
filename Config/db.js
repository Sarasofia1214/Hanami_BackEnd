import mysql from "mysql2/promise"; // versión basada en promesas de mysql2, para poder usar async/await.
import dotenv from "dotenv"; // variables de entorno 
dotenv.config();

const pool = mysql.createPool({ // Mantiene varias conexiones abiertas 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

export default pool;
