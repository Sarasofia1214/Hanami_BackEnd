import pool from "../Config/db.js";
import Joi from "joi";

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

// Obtener una reserva por id
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

// Verificar disponibilidad de mesa en un horario exacto
export const checkTableAvailability = async (table_id, reservation_time) => {
  const [rows] = await pool.query(
    `SELECT * FROM reservations
     WHERE table_id = ? AND reservation_time = ? AND status != 'cancelled'`,
    [table_id, reservation_time]
  );
// Devuelve true si no hay reservas activas para esa mesa y hora
  return rows.length === 0; 
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

// Obtiene mesas disponibles para un horario y número de personas
export const getAvailableTables = async (reservation_time, people) => {
  const [rows] = await pool.query(
    `
    SELECT t.*
    FROM restaurant_tables t
    WHERE t.status = 'available'
      AND t.capacity >= ?
      AND t.id NOT IN (
        SELECT table_id 
        FROM reservations 
        WHERE reservation_time = ? 
          AND status != 'cancelled'
      )
  `,
    [people, reservation_time]
  );

  return rows;
};

// Obtiene reservas por día, ordenadas por hora
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

// Se cambia el estado de la reserva a 'cancelled'
export const cancelReservation = async (id) => {
  await pool.query(
    `UPDATE reservations SET status = 'cancelled' WHERE id = ?`,
    [id]
  );

  return { id, status: "cancelled" };
};
