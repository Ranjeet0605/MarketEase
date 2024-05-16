import React, { Fragment, useState,useEffect} from 'react'

import { useSelector ,useDispatch} from 'react-redux'
import MetaData from '../layout/MetaData'
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import Sidebar from "./Sidebar"
import { UPDATE_ORDERS_RESET } from '../../constants/orderConstants'
import { clearErrors, getOrderDetails, updateOrder } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader'
import "./ProcessOrder.css"
const ProcessOrder = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {order,error,loading} = useSelector((state)=>state.orderDetails)
   

const{error:updateError,isUpdated} = useSelector((state)=>state.updateanddeleteOrders) ;
const {isAuthenticated} = useSelector((state)=>state.user);
const navigate = useNavigate();

const [status,setStatus]=useState();

    const updateOrderSubmitHandler=(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status",status);
        dispatch(updateOrder(id,myForm))
    }
    
   useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());

    }
    dispatch(getOrderDetails(id));
    if(updateError){
      alert.error(updateError)
      dispatch(clearErrors());
    }
    if(isUpdated){
      alert.success("Order Updated Successfully")
      
      dispatch({type:UPDATE_ORDERS_RESET});
    }
    
}, [dispatch,alert, error,updateError,isUpdated,id])
return (
    <Fragment>
    <MetaData title="Process Order"/>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
        {loading ? (<Loader/>):(isAuthenticated && <Fragment>
            <div className="confirmOrderPage" style={{display:order.orderStatus=== "Delivered"?"block":"grid",}}>
    <div>
        <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
            <div>
                 <p>Name:</p>
                 <span>{ order && order.user && order.user.name}</span>
                </div>
                <div>
                 <p>Phone:</p>
                 <span>{order && order.shippingInfo&& order.shippingInfo.phoneNo}</span>
                </div>
                <div>
                 <p>Address:</p>
                 <span>{ order && order.shippingInfo && 
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
    {/*  */}
    <div style={{display:order.orderStatus=== "Delivered"?"none":"block"}}>

    <form className="updateOrderForm"
 onSubmit={updateOrderSubmitHandler}
>
    <h1>Process Order</h1>
    <div>
        <AccountTreeIcon/>
      <select onChange={(e)=>setStatus(e.target.value)}>
        <option value="">Choose Category</option>
        {order.orderStatus === "processing" && (
            <option value="Shipped">Shipped</option>
        )}
         {order.orderStatus === "Shipped" && (
            <option value="Delivered">Delivered</option>
        )}
      </select> 
    </div>
    <Button id='createProductBtn'
      type="submit"
      disabled={loading ?true:false || status ===""? true: false}
    >
      Process
    </Button>
</form>

    </div>
   </div>
    
        </Fragment>)}
</div>
       </div>
 
   </Fragment>
  )
}


export default ProcessOrder
