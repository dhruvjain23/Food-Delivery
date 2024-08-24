import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post('/placeorder',authMiddleware,placeOrder);

export default orderRouter;
