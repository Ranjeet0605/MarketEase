import React, { useState } from 'react'
import "./App.css";
import Header from "./component/layout/Header/Header"
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Footer from "./component/layout/Footer/Footer"
import Home from "./component/Home/Home";
import Loader from './component/layout/Loader/Loader';
import WebFont from "webfontloader"
import ProductDetails from "./component/Product/ProductDetails"
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Store from './Store';
import { loaduser   } from './actions/UserAction';
import { useSelector } from 'react-redux';
import  UserOption from "./component/layout/Header/UserOption"
import Profile from "./component/User/Profile";
import ProtectRoute from './component/Route/ProtectRoute';
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from 'axios';
import Payment from "./component/Cart/Payment"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess"
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from  "./component/admin/Dashboard"
import ProductList from "./component/admin/ProductList"
import NewProduct from './component/admin/NewProduct'; 
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from './component/admin/OrderList';
import ProcessOrder from "./component/admin/ProcessOrder";
import UserList from './component/admin/UserList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReview from './component/admin/ProductReview';
import NotFound from './component/layout/NotFound';
import ContactPage from './component/layout/ContactPage/ContactPage';
import AboutUs from './component/layout/About/AboutUs';
const App=()=> {
  const{isAuthenticated,user} = useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey] = useState("");
  async function getStripeApiKey(){
   
    try {
    
      const {data} = await axios.get("/api/v1/stripeapikey")
      setStripeApiKey(data.stripeApiKey)
    
   } catch (error) {
      console.log(error);
   }
  }
React.useEffect(()=>{
  WebFont.load({
    google:{
    families:["Roboto","Droid Sans","Chilanka"],
    },
  });
  Store.dispatch(loaduser());
  getStripeApiKey()
},[]);

//  condition for inspect
  // window.addEventListener("contextmenu",(e)=> e.preventDefault());
  return (
    <Router>
    <Header/>
    {isAuthenticated && <UserOption user={user}/>}
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/contact" element={<ContactPage/>}/>
    <Route exact path="/about" element={<AboutUs/>}/>

    
     
   <Route exact path="/products/details/:id" element={<ProductDetails/>}/>
   <Route exact path='/products' element={<Products/>}/>
   <Route path='/products/:keyword' element={<Products/>}/>
   
   <Route exact path='/me/update' element={  <UpdateProfile/>} />
   <Route exact path='/account' element={ <Profile/>} />
   <Route exact path='/password/update' element={<UpdatePassword/>}/>
   <Route exact path='/password/forgot' element={<ForgotPassword/>}/>
   <Route exact path='/password/reset/:token' element={<ResetPassword/>}/>
  <Route exact path='/login' element={<LoginSignUp/>}/>
  <Route exact path='/cart' element={<Cart/>}/>
  <Route exact path='/shipping' element={<Shipping/>}/>
  
{stripeApiKey && isAuthenticated &&(
  
    <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>
  
)}
<Route exact path='/success' element={<OrderSuccess/>}/>
<Route exact path='/orders' element={<MyOrders/>}/>

<Route exact path='/order/confirm' element={<ConfirmOrder/>}/>
<Route exact path='/order/:id' element={<OrderDetails/>}/>


   <Route exact path='/admin/dashboard' element={(isAuthenticated && (user && user.role=== "admin") )? <Dashboard/>:<LoginSignUp/>}/>
   <Route exact path='/admin/product' element={(isAuthenticated && (user && user.role=== "admin"))? <ProductList/>:<LoginSignUp/>}/>
   <Route exact path='/admin/create/product' element={(isAuthenticated && (user && user.role=== "admin"))? <NewProduct/>:<LoginSignUp/>}/>
   <Route exact path='/admin/product/:id' element={(isAuthenticated && (user && user.role=== "admin") )? <UpdateProduct/>:<LoginSignUp/>}/>
   <Route exact path='/admin/orders' element={(isAuthenticated &&(user && user.role=== "admin") )? <OrderList/>:<LoginSignUp/>}/>
   <Route exact path='/admin/order/:id' element={(isAuthenticated && (user && user.role=== "admin") )? <ProcessOrder/>:<LoginSignUp/>}/>
   <Route exact path='/admin/users' element={(isAuthenticated && (user && user.role=== "admin") )? <UserList/>:<LoginSignUp/>}/>
   <Route exact path='/admin/user/:id' element={(isAuthenticated && (user && user.role=== "admin") )? <UpdateUser/>:<LoginSignUp/>}/>
   <Route exact path='/admin/reviews' element={(isAuthenticated && (user && user.role=== "admin") )? <ProductReview/>:<LoginSignUp/>}/>
   
  <Route path='*' element ={<NotFound/>}/>
 
   </Routes>
<Footer/>
</Router>
  )
}

export default App
