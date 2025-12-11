import { Router } from "express";
import {
  getReservations,
  getReservation,
  addReservation,
  editReservation,
  removeReservation,
  checkAvailability,
  listReservationsByDate,
  cancelReservationController
} from "../Controllers/reservationController.js";

// Creación un router para reservas.
const router = Router();

router.get("/", getReservations);
router.get("/availability", checkAvailability);
router.get("/by-date", listReservationsByDate);
router.get("/:id", getReservation);
router.post("/", addReservation);
router.put("/:id", editReservation);
router.delete("/:id", removeReservation);
router.patch("/:id/cancel", cancelReservationController);

export default router;
