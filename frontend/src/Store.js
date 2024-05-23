import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import  {compose} from "redux";
import { ProductDetailsReducer, ProductReducer,ProductReviewReducer,deleteProductReducer,deletereviewsReducer,newProductReducer,newReviewReducer } from "./reducers/ProductReducer";
import { UserReducer,allUsersReducer,forgotPasswordReducer, userDetailsReducer, userUpdateanddeleteReducer } from "./reducers/UserReducer";
import { ProfileReducer } from "./reducers/ProfileReducer";
import {cartReducer} from "./reducers/cartReducer";
import { AllOrderReducer, myOrdersReducer, newOrderReducer,OrderDetailsReducer, UpdateOrderReducer } from "./reducers/newOrderReducer";
const reducer = combineReducers({products: ProductReducer,
   productDetails:ProductDetailsReducer ,
   user:UserReducer,
   profile:ProfileReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
   newOrder:newOrderReducer,
   myOrders:myOrdersReducer,
   orderDetails:OrderDetailsReducer,
   NewReview:newReviewReducer,
   newProduct:newProductReducer,
   DeleteProduct:deleteProductReducer,
   allOrders:AllOrderReducer,
   updateanddeleteOrders:UpdateOrderReducer,
   updateanddeleteUser:userUpdateanddeleteReducer,
   allUsers:allUsersReducer,
   userDetails:userDetailsReducer,
   allReviews:ProductReviewReducer,
   deleteReviewReducer:deletereviewsReducer,
});
let initialState = {
    cart:{
        cartItem:localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem")):[],
        shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{},

    }
};
const middleware =[thunk];

//conditonal setup for redux devtools

const composeEnhancers = 
process.abort.env.NODE_ENV!=="PRODUCTION" && typeof window === "object" && 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: compose; 
const Store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
)
export default Store;