import express from "express";
import {  webHook } from "../controllers/payment.controllers.js";

const router = express.Router();

router.post("/", webHook);

export default router;
