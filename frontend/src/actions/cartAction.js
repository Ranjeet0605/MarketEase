
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import axios from "axios";

//add the cart
export const addItemsToCart = (id,quantity)=>async(dispatch,getstate)=>{
   try {
    const {data} = await axios.get(`/api/v1/productdetails/${id}`);
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            images:data.product.images[0].url,
            stock:data.product.stock,
            quantity,
        },
    }) 
   } catch (error) {
    console.log(error);
   }
    
   
   

    // storage for local7
    localStorage.setItem("cartItem",JSON.stringify(getstate().cart.cartItem));
}
// remove from cart
export const removeItemsFromCart = (id)=>async(dispatch,getstate)=>{
    dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
    })
    localStorage.setItem("cartItems",JSON.stringify(getstate().cart.cartItem));
}

// SAVE SHIPPING INFO

export const saveShippingInfo = (data)=>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    })
    localStorage.setItem("shippingInfo",JSON.stringify(data));
}