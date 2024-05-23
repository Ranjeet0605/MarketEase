import { CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS ,

MY_ORDERS_FAIL,
MY_ORDERS_SUCCESS,

MY_ORDERS_REQUEST,
ORDER_DETAILS_REQUEST,
ORDER_DETAILS_SUCCESS,
ORDER_DETAILS_FAIL,

ALL_ORDERS_REQUEST,
ALL_ORDERS_SUCCESS,
ALL_ORDERS_FAIL,
UPDATE_ORDERS_REQUEST,
UPDATE_ORDERS_SUCCESS,
UPDATE_ORDERS_FAIL,
UPDATE_ORDERS_RESET,
DELETE_ORDERS_REQUEST,
DELETE_ORDERS_FAIL,

DELETE_ORDERS_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";
// create orders
export const createOrder = (order)=>async(dispatch,getstate)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data} = await axios.post("/api/v1/order/create",order,config);
        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    }catch(error){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }

}


//my orders

export const myOrders = ()=>async(dispatch)=>{
    try{
        dispatch({type:MY_ORDERS_REQUEST});
       
        const {data} = await axios.get("/api/v1/orders/me");
        dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders});
    }catch(error){
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }

}

// Get all  Order Details --admin
export const getAllOrders = ()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_ORDERS_REQUEST});
       
        const {data} = await axios.get("/api/v1/admin/orders");
        dispatch({type:ALL_ORDERS_SUCCESS,payload:data.orders});
    }catch(error){
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }

}

// update order

export const updateOrder = (id,order)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDERS_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const {data} = await axios.put(`/api/v1/admin/updateorder/${id}`,order,config);
        dispatch({type:UPDATE_ORDERS_SUCCESS,payload:data.success});
    }catch(error){
        dispatch({
            type:UPDATE_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }

}
// delete order --admin
export const deleteOrder = (id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_ORDERS_REQUEST});
     
        const {data} = await axios.delete(`/api/v1/admin/deleteorders/${id}`);
        dispatch({type:DELETE_ORDERS_SUCCESS,payload:data.success});
    }catch(error){
        dispatch({
            type:DELETE_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }

}


// get orders orderdetails

export const getOrderDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST});
       
        const {data} = await axios.get(`/api/v1/order/${id}`);
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order});
    }catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message,
        });
    }

}
//clearing errors 
export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS });
}