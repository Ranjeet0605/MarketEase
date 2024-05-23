import React, { Fragment} from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import "./ConfirmOrder.css"
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@material-ui/core'
const ConfirmOrder = () => {
const{shippingInfo,cartItem} = useSelector((state)=>state.cart) ;
const{user } = useSelector((state)=>state.user);
const navigate = useNavigate();
const subtotal =   cartItem.length>=0 && cartItem.reduce((acc,item)=> acc + item.quantity * item.price,0);

const ShippingCharges = subtotal>1000? 0:200;
const tax = subtotal*0.18;
const totalPrice = subtotal+ShippingCharges+tax;
const address = shippingInfo ?`${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`: '';
    const proceedTopayment=()=>{
          const data ={
          subtotal,
          ShippingCharges,
          tax,
          totalPrice,
          };
          sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment")
    }
return (
   <Fragment>
    <MetaData title="Confirm Order"/>
    <CheckoutSteps activeStep={1}/>
   <div className="confirmOrderPage">
    <div>
        <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
                <div>
                    <p>Name:</p>
                    <span>{user && user.name}</span>
                </div>
                <div>
                    <p>Phone:</p>
                    <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                    <p>Address:</p>
                    <span>{address}</span>
                </div>
            </div>
        </div>
        <div className="confirmCartItems">
            {/* Typography ke css ke liye hum p tag use karte hai */}
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
                {cartItem && cartItem.map((item)=>(
                    <div key={item.product}>
                        <img  src={item.images} alt='Product'/>
                        <Link to={`/products/details/${item.product}`}> {item.name}</Link>
                       <span>
                        {item.quantity} X ₹{item.price}={" "}
                        <b>₹{item.price * item.quantity}</b>
                       </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    {/*  */}
    <div>
<div className="orderSummary">
    <Typography>Order Summary</Typography>
    <div>
        <div>
            <p>Subtotal:</p>
            <span>₹{subtotal}</span>
        </div>
        <div>
            <p>Shipping Charges:</p>
            <span>₹{ShippingCharges}</span>
        </div>
        <div>
            <p>GST:</p>
            <span>₹{tax}</span>
        </div>
    </div>
    <div className="orderSummaryTotal">
        <p>
            <b>Total:</b>
        </p>
        <span>₹{totalPrice}</span>
    </div>
    <button  onClick={proceedTopayment}>Proceed To Payment</button>
</div>
    </div>
   </div>
   </Fragment>
  )
}

export default ConfirmOrder
