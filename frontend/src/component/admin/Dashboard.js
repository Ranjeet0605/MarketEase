import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar'
import "./Dashboard.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Chart from 'chart.js/auto';

import { Doughnut,Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/ProductAction'
import Loader from '../layout/Loader/Loader'
import { getAllOrders } from '../../actions/orderAction'
import { getAllUsers } from '../../actions/UserAction'
const Dashboard = () => {
const dispatch = useDispatch();
const{products} = useSelector((state)=>state.products);
const{orders,loading} = useSelector((state)=>state.allOrders);
const{users} = useSelector((state)=>state.allUsers);

let userlen = users && users.length>0?users.length:0;
let orderlen = orders && orders.length>0?orders.length:0;
let len = products && products.length>0? products.length: 0;
let outOfStock = 0;
products && products.length && products.forEach((item)=>{
 if(item.stock===0){
  outOfStock+=1;
 }
})
useEffect(()=>{
  dispatch(getAdminProduct());
  dispatch(getAllOrders());
  dispatch(getAllUsers())
},[dispatch])

  let totalAmount =0;
  orders && orders.map((item)=>(
    totalAmount+=item.totalPrice
  ))
  const lineState={
    labels:["Initial Amount", "Amount Earred"],
    datasets:[
      {
        label:"TOTAL AMOUNT",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197,72,49"],
        data:[0,totalAmount],
      },
    ],
  }
  const doughtnutState ={
    labels:["Out of Stock","InStock"],
    datasets:[
      {
        backgroundColor:["red","green"],
        hoverBackgroundColor:["04B5000","#35014F"],
        data:[outOfStock,len - outOfStock],
      },
    ],
  }
  return (
    <Fragment>
      {loading?<Loader/>:(<div className='dashboard'>
        <Sidebar/>
    <div className="dashboardContainer">
   <Typography component="h1">DashBoard</Typography>
   <div className="dashboardSummary">
    <div>
      <p>
        Total Amount <br/>₹{totalAmount}
      </p>
    </div>
    <div className="dashboardSummaryBox2">
      <Link to="/admin/product">
        <p>Product</p>
        <p>{len}</p>
      </Link>
      <Link to="/admin/orders">
        <p>Orders</p>
        <p>{ orderlen}</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
        <p>{userlen}</p>
      </Link>
    </div>
   </div>
   <div className="lineChart">
    <Line data={lineState}/>
   </div>
   <div className="dooughnutChart">
    <Doughnut data={doughtnutState}/>
   </div>
    </div>
        </div>)}
    </Fragment>
  )
}

export default Dashboard
