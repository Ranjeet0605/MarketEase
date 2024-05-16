import axios from "axios";
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERROR,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
}  from "../constants/productConstants";
//getproduct as a filter
export const getProduct =(keyword="",currentPage=1,price=[0,60000],category,ratings=0)=> async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST});
       let link = `/api/v1/getproductall?keyword=${encodeURIComponent(keyword)}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
        if(category){
           link = `/api/v1/getproductall?keyword=${encodeURIComponent(keyword)}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
       const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }
};
//get all products for admin
export const getAdminProduct =()=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST});
        const {data}=  await axios.get("/api/v1/admin/products");
    
    dispatch({
        type:ADMIN_PRODUCT_SUCCESS,
        payload:data.products,
    })
}catch(error){
    dispatch({
        type:ADMIN_PRODUCT_FAIL,
        payload:error.response.data.message,
    })
}

};

//create products

export const createProduct =(productData)=> async(dispatch)=>{
    try{
        dispatch({type:NEW_PRODUCT_REQUEST});
        const config ={
            headers:{"Content-Type":"application/json"},
        };
        const {data} = await axios.post(`/api/v1/admin/products/new`,productData,config)
        
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload:data,
        })
    }
    catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }  
};
// update products
export const updateProduct =(id,productData)=> async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PRODUCT_REQUEST});
        const config ={
            headers:{"Content-Type":"application/json"},
        };
        const {data} = await axios.put(`/api/v1/admin/productupdate/${id}`,productData,config)
        
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }  
};

// delete products

export const deleteProduct =(id)=> async(dispatch)=>{
    try{
        dispatch({type:DELETE_PRODUCT_REQUEST});
      
        const {data} = await axios.delete(`/api/v1/admin/productdelete/${id}`)
        
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message,
        });
    }  
};

//getproductdeatils
export const getproductdetails =(id)=> async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/v1/productdetails/${id}`)
        console.log({data});
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product,
        })
    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message,
        });
    }  
};

// product reviews 

export const newReview =(reviewData)=> async(dispatch)=>{
    try{
        dispatch({type:NEW_REVIEW_REQUEST});
        const config ={
            headers:{"Content-Type":"application/json"},
        };
        const {data} = await axios.put(`/api/v1/review`,reviewData,config)
        console.log({data});
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message,
        });
    }  
};


// get all reviews of the product 

export const getAllReviews =(id)=> async(dispatch)=>{
    try{
        dispatch({type:ALL_REVIEW_REQUEST});
      
        const {data} = await axios.get(`/api/v1/getallproductreview?ProductId=${id}`)
        
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload:data.reviews,
        })
    }
    catch(error){
        dispatch({
            type:ALL_REVIEW_FAIL,
            payload:error.response.data.message,
        });
    }  
};

//  delete review of the product 
export const DeleteReview =(reveiwId,productId)=> async(dispatch)=>{
    try{
        dispatch({type:DELETE_REVIEW_REQUEST});
      
        const {data} = await axios.delete(`/api/v1/deleteReviews?id=${reveiwId}&productId=${productId}`)
        
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload:data.success,
        })
    }
    catch(error){
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message,
        });
    }  
};

//clearing errors 

export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type: CLEAR_ERROR });
}