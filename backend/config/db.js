import mongoose from 'mongoose'

export const connectDB= async ()=>{

    await mongoose.connect('mongodb+srv://djain01d:aRloeBzj3byCMSH0@cluster0.njg29.mongodb.net/FOOD-DELIVERY').then(()=>console.log('DB Connected'));

}