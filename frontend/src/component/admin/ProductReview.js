import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { DataGrid } from '@material-ui/data-grid'
import { useSelector,useDispatch } from 'react-redux'
import { DeleteReview, clearErrors, getAllReviews} from '../../actions/ProductAction'
import {  useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import StarIcon from '@material-ui/icons/Star'
import DeleteIcon from "@material-ui/icons/Delete"
import {  DELETE_REVIEW_RESET } from '../../constants/productConstants'
import "./ProductReview.css"


const  ProductReview = () => {
    const dispatch = useDispatch();
    const [productId, setProductId] = useState("");
    const alert = useAlert();
    const navigate = useNavigate();
    const {error,reviews,loading} = useSelector((state)=>state.allReviews);
    const{error:deleteError,isDeleted} = useSelector((state)=>state.deleteReviewReducer)
   const deleteProductReviewHandler=(reveiwId)=>{
    dispatch(DeleteReview(reveiwId,productId));
   }
   const ProductReviewSubmitHandler =(e)=>{
    e.preventDefault();
   dispatch(getAllReviews(productId))
   }
   useEffect(() => {
    if(productId.length === 24){
        dispatch(getAllReviews(productId))
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());

    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success("Review Delete Successfully")
      navigate("/admin/reviews")
      dispatch({type:DELETE_REVIEW_RESET});
    }
    
}, [dispatch,alert, error,navigate,deleteError,isDeleted,productId])

   const columns =[
    {field:"id",headerName:"Review ID",minWidth:200,flex:0.5},
    {field:"user",headerName:"User",minWidth:200,flex:0.5},
    {field:"comment",headerName:"Comment",minWidth:250,flex:0.5},
    {field:"rating",headerName:"Rating", type:"number" ,minWidth:150,flex:0.4,
    cellClassName:(params)=>{
        return params.getValue(params.id,"rating") <=3? "greenColor":"redColor"
      }
  
    },
    {field:"actions",headerName:"Actions", type:"number",minWidth:150,flex:0.3,sortable:false,

   renderCell:(params)=>{
    return(
        <Fragment>
           
        <Button onClick={()=>deleteProductReviewHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
        </Button>
      
        </Fragment>
    )
   }
},

   ]

   const rows=
   reviews && reviews.length>0 ? reviews.map((item,index)=>({
       id:item._id,
       user:item.name,
       comment:item.comment,
       rating:item.rating,
   })):[];
  



  return (
    <Fragment>
        <MetaData title={`ALL REVIEWS - Admin`}/>
        <div className="dashboard">
         <Sidebar/>
         <div className="productReveiwsContainer">
         <form className="productReveiwsForm" oncType="multipart/form-data"
        onSubmit={ProductReviewSubmitHandler}>
            <h1 className='productReviewsFormHeading'>Search Review</h1>
        <div>
            <StarIcon/>
            <input type='text' placeholder='product id'
            required
            value={productId}
            onChange={(e)=>setProductId(e.target.value)}/>
        </div>   
        <Button id="createProductBtn" type='submit' 
      disabled={
        loading?true:false || productId===""?true:false

      }
      >Search</Button>
        </form>
      {  reviews && reviews.length>0 ? 
      <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    disableSelectionOnClick
     className='productListTable'
     autoHeight
    />: <h1 className='productReviewsFormHeading'>No Reviews Found</h1>}

         </div>
        </div>
    </Fragment>
  )
}


export default ProductReview
