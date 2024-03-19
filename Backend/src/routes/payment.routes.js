import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { makePayment } from "../controllers/payment.controllers.js";

const router = express.Router();

router.route("/").post(protect ,makePayment)

export default router;