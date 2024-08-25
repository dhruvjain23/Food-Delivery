import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-delivery-by8i.onrender.com";
    const [token, setToken] = useState('');
    const [food_list, setFood_List] = useState([]);



    const addToCart =async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))    //this function checks whether the item is present in the
        }                                                   //cart or not , if item is not present in ther cart, it wil
        else {                                               // create that itemid in the cart.
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))   // this will increase the qunatity by 1, if 
        }         
        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }                                                      //item is present in the cart
    }

    const removeFromCart = async(itemId) => {                              // this function decrease the count of that item 
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 })) //from the cart.
        if(token){
            await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
            
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    
    const fetchFoodList = async()=>{
        const response = await axios.get(url+'/api/food/list');
        setFood_List(response.data.data)
    }


const loadCartData = async(token) =>{
    const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
    setCartItems (response.data.cartData);
}


    useEffect(() => {
        async function loadData(){
            await fetchFoodList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider
