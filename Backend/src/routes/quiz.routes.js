import express from "express";
import { getCategory,getQuestions,getResults } from "../controllers/Quiz.controllers.js";

const router = express.Router();
router.route("/").get(getCategory)
router.route("/:id").get(getQuestions)
router.route("/result/:category").get(getResults)

export default router;
