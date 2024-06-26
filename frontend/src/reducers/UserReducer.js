import 
{LOGIN_REQUEST ,
 LOGIN_SUCCESS ,
LOGIN_FAIL, 
REGISTER_USER_FAIL,
REGISTER_USER_SUCCESS,
REGISTER_USER_REQUEST,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
LOAD_USER_FAIL,
LOGOUT_SUCCESS,
LOGOUT_FAIL,
CLEAR_ERROR,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
RESET_PASSWORD_REQUEST,
RESET_PASSWORD_FAIL,
RESET_PASSWORD_SUCCESS,

ALL_USERS_REQUEST,
ALL_USERS_SUCCESS ,
ALL_USERS_FAIL,

USER_DETAILS_REQUEST,
USER_DETAILS_SUCCESS,
USER_DETAILS_FAIL,

UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
UPDATE_USER_FAIL,
UPDATE_USER_RESET,

DELETE_USER_REQUEST,
DELETE_USER_SUCCESS,
DELETE_USER_FAIL,
DELETE_USER_RESET,
} from "../constants/userConstant";
// login ,register , Load user and Logout reducer
export const UserReducer = (state ={user:{}},action)=>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false,
            }
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user: action.payload,
            }
            case LOGOUT_SUCCESS:
                return {
                    loading:false,
                    user:null,
                    isAuthenticated:false,
                }
           case LOGIN_FAIL:
           case REGISTER_USER_FAIL:
          return{
            ...state,
            loading:false,
            isAuthenticated:false,
            user:null,
        error:action.payload,      
      };
          case LOAD_USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload, 
            }
            case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                }
          case CLEAR_ERROR:
            return {
                ...state,
                 error:null,
            }
        default:
           return state;
    }
}
// forgot password reducer  AND PASSWORD RESET

export const  forgotPasswordReducer =(state={},action)=>{
    switch(action.type){
     case FORGOT_PASSWORD_REQUEST:
     case RESET_PASSWORD_REQUEST:
         return{
             ...state,
             loading:true,
             error:null,
         };
         case FORGOT_PASSWORD_SUCCESS:
        
         return{
             ...state,
             loading:false,
             message:action.payload,
         };
         case RESET_PASSWORD_SUCCESS:
         return{
             ...state,
             loading:false,
             success:action.payload,
         };
         case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
             return{
                 ...state,
                 loading:false,
                 error:action.payload,
             };
       
             case CLEAR_ERROR:
             return{
                 ...state,
                 error:null, 
             }
             default:
                 return state
    }
 }

 // ALL USERS REDUCERS
 export const  allUsersReducer =(state={users:[]},action)=>{
    switch(action.type){
     
     case ALL_USERS_REQUEST:
         return{
             ...state,
             loading:true,
             
         };
         case ALL_USERS_SUCCESS:
         return{
             ...state,
             loading:false,
           users:action.payload,
         };
       
     
        case ALL_USERS_FAIL:
             return{
                 ...state,
                 loading:false,
                 error:action.payload,
             };
       
             case CLEAR_ERROR:
             return{
                 ...state,
                 error:null, 
             }
             default:
                 return state
    }
 }
 // userdetails reducer

 export const  userDetailsReducer =(state={user:{}},action)=>{
    switch(action.type){
     
     case USER_DETAILS_REQUEST:
         return{
             ...state,
             loading:true,
             
         };
         case USER_DETAILS_SUCCESS:
         return{
             ...state,
             loading:false,
           user:action.payload,
         };
       
     
        case USER_DETAILS_FAIL:
             return{
                 ...state,
                 loading:false,
                 error:action.payload,
             };
       
             case CLEAR_ERROR:
             return{
                 ...state,
                 error:null, 
             }
             default:
                 return state
    }
 }

 // user update  and delete user --admin

 export const  userUpdateanddeleteReducer =(state={},action)=>{
    switch(action.type){
     
     case UPDATE_USER_REQUEST:
     case DELETE_USER_REQUEST:
         return{
             ...state,
             loading:true,
             
         };
     case UPDATE_USER_SUCCESS:
         return{
             ...state,
             loading:false,
          isUpdated:action.payload,
         };
         case DELETE_USER_SUCCESS:
         return{
             ...state,
             loading:false,
          isDeleted:action.payload,
          message:action.payload.message,
         };
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
             return{
                 ...state,
                 loading:false,
                 error:action.payload,
             };
        case UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated:false,
            }
        case DELETE_USER_RESET:
           return{
            ...state,
            isDeleted:false,
           }
             case CLEAR_ERROR:
             return{
                 ...state,
                 error:null, 
             }
             default:
                 return state
    }
 }

