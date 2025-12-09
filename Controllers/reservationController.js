import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
  validateReservation,
  checkTableAvailability,
  getAvailableTables,
  getReservationsByDate,
  cancelReservation,
} from "../Models/reservationModel.js";

export const getReservations = async (req, res) => {
  try {
    const reservations = await getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error getting reservations" });
  }
};

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

export const addReservation = async (req, res) => {
  try {
    const { error } = validateReservation(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { table_id, reservation_time } = req.body;

    const available = await checkTableAvailability(table_id, reservation_time);

    if (!available) {
      return res.status(400).json({
        error: "This table is already booked at that time.",
      });
    }

    const newReservation = await createReservation(req.body);
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "Error creating reservation" });
  }
};

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

export const removeReservation = async (req, res) => {
  try {
    const result = await deleteReservation(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error deleting reservation" });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { datetime } = req.query;

    if (!datetime) {
      return res.status(400).json({ error: "datetime query param is required" });
    }

    const availableTables = await getAvailableTables(datetime);
    res.json(availableTables);

  } catch (error) {
    res.status(500).json({ error: "Error checking availability" });
  }
};

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

export const cancelReservationController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cancelReservation(id);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: "Error cancelling reservation" });
  }
};
