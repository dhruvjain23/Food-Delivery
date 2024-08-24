import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/caetControllers.js'
import { get } from 'mongoose';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddleware, addToCart)
cartRouter.post('/remove',authMiddleware,removeFromCart)
cartRouter.post('/get',authMiddleware,getCart)


export default cartRouter