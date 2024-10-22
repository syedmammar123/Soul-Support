import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { getMessages, sendMessage } from '../controllers/message.controllers.js';

const router = express.Router();

router.route('/').get(protect,getMessages).post(protect,sendMessage)


export default router
