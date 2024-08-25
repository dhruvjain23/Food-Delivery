import userModel from '../models/userModel.js'


//add item to cart
const addToCart = async(req,res)=>{
    try {
        let userData =await userModel.findById(req.body.userId);
        console.log(userData);
        let cartData =await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:'Added to cart successfully'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'Error'})
    }

}

//remove from cart
const removeFromCart = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true,message:'Removed from cart'})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:'Error'});
    }

}

//fecth data from cart
const getCart  = async(req,res)=>{

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}




export {addToCart, removeFromCart, getCart}

