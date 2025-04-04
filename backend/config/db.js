import mongoose from 'mongoose'

export const connectDB= async ()=>{

    await mongoose.connect('Your-mongoURL').then(()=>console.log('DB Connected'));

}
