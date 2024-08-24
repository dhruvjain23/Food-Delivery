import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user
const loginUser= async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user = await userModel.findOne({email})

    if(!user){
        return res.json({success:false, message:'User doesnt exists'})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false, message:'Invalid credentials'})
    }

    const token =createToken(user._id);
    res.json({success:true,token})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:'Error'})
  }
}


const createToken= (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
//register user
const registerUser = async (req,res)=>{
    const {name,password,email}=req.body;
    try {
        const exist =await userModel.findOne({email})
        if(exist){
            return res.json({success:false,message:'User already exists'})
        }
        //vaidating emial format and stoen pass
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Enter valid email'})
        }
        if(password.length<5){
            return res.json({success:false,message:'Please create strong password'})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hasshedPasswwrod = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hasshedPasswwrod,

        })

        const user= await newUser.save()
        const token =createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }
}

export  {loginUser,registerUser}