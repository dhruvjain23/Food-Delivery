import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { placeOrder } from "../controllers/orderControllers.js";

const orderRouter = express.Router();

orderRouter.post('/order',authMiddleware,placeOrder);

export default orderRouter;
