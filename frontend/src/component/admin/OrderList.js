import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import "./ProductList.css"
import { DataGrid } from '@material-ui/data-grid'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors } from '../../actions/orderAction'
import { Link, useNavigate} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

import { deleteOrder, getAllOrders } from '../../actions/orderAction'
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants'

 

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,orders} = useSelector((state)=>state.allOrders);
    const{error:deleteError,isDeleted} = useSelector((state)=>state.updateanddeleteOrders)
   const deleteOrderHandler=(id)=>{
    dispatch(deleteOrder(id));
   }
  

   useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());

    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Order Delete Successfully")
      navigate("/admin/orders")
      dispatch({type:DELETE_ORDERS_RESET});
    }
    dispatch(getAllOrders());
}, [dispatch,alert, error,navigate,deleteError,isDeleted])

   const columns =[
    {field:"id",headerName:"Order ID" ,minWidth: 300,flex: 0.7},
      {field:"status",headerName:"Status",minWidth:150, flex: 0.5,
        cellClassName:(params)=>{
          return params.getValue(params.id,"status") === "Delivered"?"greenColor":"redColor"
        }
    
    },
      {field:"itemsQty",headerName:"Items Qty",type:"number",minWidth:150,flex:0.3},
      {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
    {field:"actions",headerName:"Actions", type:"number",minWidth:150,flex:0.3,sortable:false,

   renderCell:(params)=>{
    return(
        <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}><EditIcon/></Link>
        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
        </Button>
      
        </Fragment>
    )
   }
},

   ]

   const rows=
   orders && orders.length>0 ? orders.map((item,index)=>({
       id:item._id,
       itemsQty:item.orderInfo.length,
       amount:item.totalPrice,
       status:item.orderStatus,
   })):[];
  



  return (
    <Fragment>
        <MetaData title={`ALL Orders -- Admin`}/>
        <div className="dashboard">
         <Sidebar/>
         <div className="productListContainer">
            <h1 id='productListHeading'>ALL ORDERS</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
             className='productListTable'
             autoHeight
            />

         </div>
        </div>
    </Fragment>
  )
}

export default OrderList
