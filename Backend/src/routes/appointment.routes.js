import express from "express";
import { createAppointment, getAppointments, validateAppointments } from "../controllers/appointment.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect ,getAppointments).post(protect ,createAppointment)
router.route("/validate").post(protect ,validateAppointments)

export default router;