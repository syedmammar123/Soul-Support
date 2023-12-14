import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createSession, getAllSessions, getOneSession } from '../controllers/session.controllers.js';

const router = express.Router();

router.route('/all').get(getAllSessions) // all for main page
router.route('/one').get(protect,getOneSession) //to display  prof his sessions
router.route('/').post(protect,createSession) 


export default router