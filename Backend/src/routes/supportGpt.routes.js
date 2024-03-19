import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { postChat,getChat } from '../controllers/supportGpt.controllers.js';

const router = express.Router();

router.route('/').get(protect,getChat).post(protect,postChat)


export default router
// router.route('/').get(protect,getChat).post(protect,postChat)
