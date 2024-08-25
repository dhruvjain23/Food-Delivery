import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';


//app config
const app=express();
const port= 4000;

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();


//api endpoint
app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send('API not working')
})

app.listen(4000,()=>{
    console.log(`Server started on http://localhost:${port}`);
    
})


//aRloeBzj3byCMSH0
//mongodb+srv://djain01d:<db_password>@cluster0.njg29.mongodb.net/?