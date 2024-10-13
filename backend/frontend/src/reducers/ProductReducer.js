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
    NEW_REVIEW_RESET,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
} from "../constants/productConstants"
export const ProductReducer = (state = {products: []},
  action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
          return{
            loading:true,
            product:[],
          };
      case ALL_PRODUCT_SUCCESS:
        return{ 
            loading:false,
            products:action.payload.products,
            productCount:action.payload.productCount,
            resultperpage:action.payload.resultperpage,

        };
        case ADMIN_PRODUCT_SUCCESS:
          return{
            loading:false,
            products:action.payload,
          }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return{
             loading:false,
             error:action.payload,
            }
            case CLEAR_ERROR:
              return {
                ...state,
              error: null,
            }
        default:
           return state;
    }
  }
//productdetails reducer 
  export const ProductDetailsReducer = 
(state = { product:{} },
  action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
          return{
            ...state,
            loading:true,
            
          }; 
      case  PRODUCT_DETAILS_SUCCESS:
        return{
            ...state,
            loading:false,
            product:action.payload,
    
        };
        case PRODUCT_DETAILS_FAIL:
            return{
            ...state,
            loading:false,
            error:action.payload,
            }
            case CLEAR_ERROR:
              return {...state,  
              error: null,
            }
        default:
           return state;
    }
  }

// product revies reducer
export const newReviewReducer =  (state={},action)=>{
  switch(action.type){
    case NEW_REVIEW_REQUEST:
      return{
       ...state,
      loading:true,
      }
    case NEW_REVIEW_SUCCESS:
      return{
        loading:false,
        success:action.payload,
      }
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload,
        }
      case NEW_REVIEW_RESET:
        return{
          ...state,
          success:false,
        }
      case CLEAR_ERROR:
        return{ 
          ...state,
        error:null,
      }
      default :
      return state;
  }

}


// new product create 

export const newProductReducer =  (state={product:{}},action)=>{
  switch(action.type){
    case NEW_PRODUCT_REQUEST:
      return{
       ...state,
      loading:true,
      }
    case NEW_PRODUCT_SUCCESS:
      return{
        loading:false,
        success:action.payload.success,
        product:action.payload.product,
      }
      case NEW_PRODUCT_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload,
        }
      case NEW_PRODUCT_RESET:
        return{
          ...state,
          success:false,
        }
      case CLEAR_ERROR:
        return{ 
          ...state,
        error:null,
      }
      default :
      return state;
  }

}
// PRDOUCT DELETE  AND UPDATED REDUCER BY --ADMIN

export const deleteProductReducer =  (state={product:{}},action)=>{
  switch(action.type){
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return{
       ...state,
      loading:true,
      }
    case DELETE_PRODUCT_SUCCESS:
      return{
        ...state,
        loading:false,
        isDeleted:action.payload,
      }
      case UPDATE_PRODUCT_SUCCESS:
        return{
          ...state,
          loading:false,
          isUpdated:action.payload,
        }
      case DELETE_PRODUCT_FAIL:
      case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload,
        }
      case DELETE_PRODUCT_RESET:
        return{
          ...state,
          isDeleted:false,
        }
        case UPDATE_PRODUCT_RESET:
          return{
            ...state,
            isUpdated:false,
          }
      case CLEAR_ERROR:
        return{ 
          ...state,
        error:null,
      }
      default :
      return state;
  }

}


// GET ALL PRODUCT REVIEWS REDUCER

export const ProductReviewReducer =  (state={reveiws:[]},action)=>{
  switch(action.type){
    case ALL_REVIEW_REQUEST:
      return{
       ...state,
      loading:true,
      }
    case ALL_REVIEW_SUCCESS:
      return{
        loading:false,
        reviews:action.payload,
      }
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload,
        }
    
      case CLEAR_ERROR:
        return{ 
          ...state,
        error:null,
      }
      default :
      return state;
  }

}
// delete reveiws reducer
export const deletereviewsReducer =  (state={},action)=>{
  switch(action.type){
    case DELETE_REVIEW_REQUEST:
      return{
       ...state,
      loading:true,
      }
    case DELETE_REVIEW_SUCCESS:
      return{
        loading:false,
       
        isDeleted:action.payload,
      }
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading:false,
          error:action.payload,
        }
      case DELETE_REVIEW_RESET:
        return{
          ...state,
          isDeleted:false,
        }
      case CLEAR_ERROR:
        return{ 
          ...state,
        error:null,
      }
      default :
      return state;
  }

}