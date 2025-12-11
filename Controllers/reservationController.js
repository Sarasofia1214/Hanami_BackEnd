import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  validateReservation,
  getAvailableTables,
  getReservationsByDate,
  cancelReservation,
} from "../Models/reservationModel.js";

// muestra las reservas con mesa y usuario
export const getReservations = async (req, res) => {
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error getting reservations" });
  }
};

// GET /reservations/:id
export const getReservation = async (req, res) => {
  try {
    const reservation = await getReservationById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: "Error getting reservation" });
  }
};

// asigna mesa automáticamente y usa user_id a una mesa disponible
export const addReservation = async (req, res) => {
  try {
     // Validar payload con Joi 
    const { error } = validateReservation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { reservation_time, number_of_people, user_id } = req.body;

    // Busca mesas disponibles para ese número de personas
    const availableTables = await getAvailableTables(
      reservation_time,
      Number(number_of_people)
    );

    if (availableTables.length === 0) {
      return res
        .status(400)
        .json({ error: "No hay mesas disponibles para ese horario." });
    }

    // se elige la primera mesa libre
    const chosenTable = availableTables[0];

    const newReservation = await createReservation({
      table_id: chosenTable.id,
      user_id,
      reservation_time,
      number_of_people,
      status: "pending",
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "Error creating reservation" });
  }
};

// PUT /reservations/:id
export const editReservation = async (req, res) => {
  try {
    const { error } = validateReservation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updated = await updateReservation(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating reservation" });
  }
};
// Elimina una reserva 
export const removeReservation = async (req, res) => {
  try {
    const result = await deleteReservation(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error deleting reservation" });
  }
};

// Devuelve las mesas disponibles para un horario y número de personas
export const checkAvailability = async (req, res) => {
  try {
    const { datetime, people } = req.query;

    if (!datetime || !people) {
      return res
        .status(400)
        .json({ error: "datetime and people query params are required" });
    }

    const availableTables = await getAvailableTables(
      datetime,
      Number(people)
    );
    res.json(availableTables);
  } catch (error) {
    res.status(500).json({ error: "Error checking availability" });
  }
};

// Lista las reservas de un día concreto ordenadas por hora
export const listReservationsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "date query param is required" });
    }

    const reservations = await getReservationsByDate(date);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error getting reservations by date" });
  }
};

// PATCH /reservations/:id/cancel
export const cancelReservationController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cancelReservation(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error cancelling reservation" });
  }
};
