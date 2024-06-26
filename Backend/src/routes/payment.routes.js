import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { makePayment, createCheckoutSession } from "../controllers/payment.controllers.js";

const router = express.Router();

router.route("/").post(protect ,makePayment)
router.route("/create-checkout-session").post(protect ,createCheckoutSession)

export default router;