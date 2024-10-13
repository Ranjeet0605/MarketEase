import React from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"
const OrderSuccess=() => {
  return (
   <div className="orderSuccess">
    <BiCheckCircle /> 
    <Typography>Your Order has been Placed successfully</Typography>
    <Link to="/orders">View Orders</Link>
   </div>
  )
}

export default OrderSuccess
