import pool from "../Config/db.js";
import Joi from "joi";

// Validación con Joi segun el esquema definido
const reservationSchema = Joi.object({
  table_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().allow(null),
  reservation_time: Joi.date().required(), // DATETIME
  number_of_people: Joi.number().integer().min(1).required(),
  status: Joi.string().valid("pending", "confirmed", "cancelled").default("pending")
});

export const validateReservation = (data) => {
  return reservationSchema.validate(data);
};

// Obtener todas las reservas
export const getAllReservations = async () => {
  const [rows] = await pool.query(`
    SELECT r.*, t.name AS table_name, u.name AS user_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    LEFT JOIN users u ON r.user_id = u.id
  `);
  return rows;
};

// Obtener una reserva por ID
export const getReservationById = async (id) => {
  const [rows] = await pool.query(
    `SELECT r.*, t.name AS table_name, u.name AS user_name
     FROM reservations r
     LEFT JOIN restaurant_tables t ON r.table_id = t.id
     LEFT JOIN users u ON r.user_id = u.id
     WHERE r.id = ?`,
    [id]
  );
  return rows[0];
};

// Verificar disponibilidad de mesa (misma hora exacta)
export const checkTableAvailability = async (table_id, reservation_time) => {
  const [rows] = await pool.query(
    `SELECT * FROM reservations
     WHERE table_id = ? AND reservation_time = ? AND status != 'cancelled'`,
    [table_id, reservation_time]
  );

  return rows.length === 0; // true → está disponible
};

// Crear reserva
export const createReservation = async (data) => {
  const { table_id, user_id, reservation_time, number_of_people, status } = data;

  const [result] = await pool.query(
    `INSERT INTO reservations 
      (table_id, user_id, reservation_time, number_of_people, status)
     VALUES (?, ?, ?, ?, ?)`,
    [table_id, user_id, reservation_time, number_of_people, status]
  );

  return { id: result.insertId, ...data };
};

// Actualizar reserva
export const updateReservation = async (id, data) => {
  const { table_id, user_id, reservation_time, number_of_people, status } = data;

  await pool.query(
    `UPDATE reservations SET
       table_id = ?, 
       user_id = ?, 
       reservation_time = ?, 
       number_of_people = ?, 
       status = ?
     WHERE id = ?`,
    [table_id, user_id, reservation_time, number_of_people, status, id]
  );

  return { id, ...data };
};

// Eliminar reserva
export const deleteReservation = async (id) => {
  await pool.query("DELETE FROM reservations WHERE id = ?", [id]);
  return { message: "Reservation deleted successfully" };
};


export const getAvailableTables = async (reservation_time) => {
  const [rows] = await pool.query(`
    SELECT t.*
    FROM restaurant_tables t
    WHERE t.id NOT IN (
      SELECT table_id 
      FROM reservations 
      WHERE reservation_time = ? 
      AND status != 'cancelled'
    )
  `, [reservation_time]);

  return rows;
};


export const getReservationsByDate = async (date) => {
  const [rows] = await pool.query(`
    SELECT r.*, t.name AS table_name, u.name AS user_name
    FROM reservations r
    LEFT JOIN restaurant_tables t ON r.table_id = t.id
    LEFT JOIN users u ON r.user_id = u.id
    WHERE DATE(r.reservation_time) = ?
    ORDER BY r.reservation_time ASC
  `, [date]);

  return rows;
};


export const cancelReservation = async (id) => {
  await pool.query(
    `UPDATE reservations SET status = 'cancelled' WHERE id = ?`,
    [id]
  );

  return { id, status: "cancelled" };
};
