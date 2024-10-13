import React, { Fragment, useEffect } from 'react'
import {DataGrid} from "@material-ui/data-grid";
import "./MyOrders.css";
import {useSelector ,useDispatch} from "react-redux";
import {Typography} from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch"
import MetaData from "../layout/MetaData"
import Loader from "../layout/Loader/Loader"
import {myOrders,clearErrors }from "../../actions/orderAction"
import {useAlert} from 'react-alert'
import { Link } from 'react-router-dom';
const MyOrders = () => {
   const dipatch = useDispatch();
   const alert = useAlert();
   const {loading,error,orders} = useSelector((state)=>state.myOrders);
     const {isAuthenticated ,user} = useSelector((state)=>state.user);
    
    // columns and rows model
     const columns = [
      {field:"id",headerName:"Order ID" ,minWidth: 300,flex: 0.7},
      {field:"status",headerName:"Status",minWidth:150, flex: 0.5,
        cellClassName:(params)=>{
          return params.getValue(params.id,"status") === "Delivered"?"greenColor":"redColor"
        }
    
    },
      {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.3},
      {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
      {field:"actions",headerName:"Actions",minWidth:150,type:"number",sortable:false,
        renderCell:(params)=>{
          return(
            <Link to={`/order/${params.getValue(params.id,"id")}`}>
              <LaunchIcon/>
            </Link>

          )
        }
    
    },

     ];
     const rows=
      orders && orders.map((item,index)=>({
          itemsQty:item.orderInfo.length ? item.orderInfo.length:0,
          id:item._id,
          status:item.orderStatus,
          amount:item.totalPrice,
      }))
     



     useEffect(()=>{
      if(error){
        alert.error(error);
        dipatch(clearErrors());
      }
      dipatch(myOrders())
     },[dipatch,error,alert])
  return (
<Fragment>
<MetaData title={`${ isAuthenticated && user && user.name} - Orders`}/>
{loading ? (
  <Loader/>
):(
<div className="myOrdersPage">
  <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  disableSelectionOnClick
  className='myOrdersTabel'
  autoHeight
  />
  <Typography id="myOrderHeading">{isAuthenticated && user && user.name}'s Orders</Typography>
</div>
)}
</Fragment>
  )
}

export default MyOrders
