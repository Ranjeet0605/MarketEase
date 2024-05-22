import React, { Fragment } from 'react'
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import {useSelector,useDispatch} from "react-redux";
import { addItemsToCart ,removeItemsFromCart} from '../../actions/cartAction';
import { Link } from 'react-router-dom';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItem} = useSelector((state)=>state.cart)
  const incraseQuantity = (id,quantity,stock)=>{
    const newQty =  quantity+1;
    if(stock<=newQty){
        return ;
    }
    dispatch(addItemsToCart(id,newQty))
  }
  const decraseQuantity = (id,quantity)=>{
    let newQty =  quantity-1;
    if(0>=newQty){
        return ;
    }
    dispatch(addItemsToCart(id,newQty))
  }
  const deletecartItem = (id)=>{
    dispatch(removeItemsFromCart(id));
  }
  const checkOutHandler =()=>{
    navigate("/login?redirect=shipping");
  }
  return (
  <Fragment>
    {cartItem.length===0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon/>
        <Typography >No Product in your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ): (<Fragment>
    <div className="cartPage">
     <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>Subtotal</p>
     </div>
   {cartItem && cartItem.length>=0 && cartItem.map((item)=>(
         <div className="cartContainer" key={item.product}>
         <CartItemCard item={item} deletecartItem={deletecartItem}/>
         <div className="cartInput">
             <button onClick={()=>decraseQuantity(item.product,item.quantity)}>-</button>
             <input type='number' value={item.quantity} readOnly/>
             <button onClick={()=>incraseQuantity(item.product,item.quantity, item.stock)}>+</button>
         </div>
         <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
      </div>

   ))}
     <div className="cartGrossProfit">
        <div></div>
            <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{ cartItem.length>=0 &&`₹${cartItem.reduce((acc,item)=> acc + item.quantity * item.price,0)}`}</p>
            </div>
            <div></div>
        
         <div className='checkOutBtn'>
            <button onClick={checkOutHandler}>Check Out</button>
         </div>
         </div>
    </div>
  </Fragment>)}
  </Fragment>
  )
}

export default Cart
