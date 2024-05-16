import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import { useParams,Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { Typography } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import "./OrderDetails.css"
const OrderDetails = () => {
    const {isAuthenticated} = useSelector((state)=>state.user);
    const {order,error,loading} = useSelector((state)=>state.orderDetails)
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
  useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));

  },[dispatch,alert ,error,id]);
  
    return (
   <Fragment>
{loading ? <Loader/>: isAuthenticated && <Fragment>
    
    <MetaData title="Order Details"/>
    <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
            <Typography component="h1">
                Order #{order && order._id}
                </Typography>
                <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
                <div>
                 <p>Name:</p>
                 <span>{order.user && order.user.name}</span>
                </div>
                <div>
                 <p>Phone:</p>
                 <span>{order.shippingInfo&& order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                 <p>Address:</p>
                 <span>{order.shippingInfo && 
                 `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pincode},${order.shippingInfo.country}`
                 }</span>
                </div>
            </div>
            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
                <div>
                <p className={
                    order.paymentInfo && order.paymentInfo.status==="succeeded"?"greenColor":"redColor"
                }>
                    {
                    order.paymentInfo && order.paymentInfo.status==="succeeded"?"PAID":"NOT PAID"
                }
                </p>
                </div>
                <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                </div>
            </div>
            <Typography>Order Status</Typography>
           <div className="orderDetailsContainerBox">
            <div>
                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "greenColor":"redColor"}>{order.orderStatus && order.orderStatus}</p>
            </div>
           </div>

        </div>
        <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className='orderDetailsCartItemsContainer'>
                {order.orderInfo && order.orderInfo.map((item)=>(
                    <div key={item.product}>
                        <img src={item.images} alt='Product'/> 
                        <Link to={`/products/details/${item.product}`}>{item.name}</Link>{""}
                        <span>
                            {item.quantity}X ₹{item.price}={""}
                            <b>₹{item.price * item.quantity}</b>
                        </span>
                    </div>
                ))}
            </div>
        </div>

    </div>
    </Fragment>}
   </Fragment>
  )
}

export default OrderDetails
