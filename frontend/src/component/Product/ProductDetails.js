import React, { Fragment, useEffect, useState } from 'react'
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import {clearErrors, getproductdetails, newReview} from "../../actions/ProductAction"; 
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-star-rating-component";
import { useParams } from 'react-router-dom';
import ReviewCard from "./ReviewCard"
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
const  ProductDetails=({match})=> {
  const alert = useAlert();
  const dispatch = useDispatch();

  const {id} = useParams();
  const{product,error,loading} = useSelector((state)=>state.productDetails)
  const{success,error:reviewerror} = useSelector((state)=>state.NewReview);
  const [quantity,setQuantity] = useState(1);
  const[rating,setRating]=useState(0);
  const[comment,setComment] = useState("");
  const[open,setOpen] = useState(false);
  const submitReviewToggle =()=>{
     open ?setOpen(false):setOpen(true);
  }
 const increaseQuantity = ()=>{
  if(product.stock <=quantity)return; 
   let qty = quantity+1;
   setQuantity(qty);
 }
 const decreaseQuantity = ()=>{
    let qty = quantity-1;
    if(0>=qty)return ;
    setQuantity(qty);
 }
const addToCartHandler=()=>{
  dispatch(addItemsToCart(id,quantity));
  alert.success("Item Added To cart");
}
//reviewsubmit handler 
const reviewSubmitHandler =()=>{
  const myForm = new FormData();
  myForm.set("rating",rating);
  myForm.set("comment",comment);
  myForm.set("productId",id)
  dispatch(newReview(myForm));
  setOpen(false);
}


  useEffect(()=>{
    if(error)
{
 alert.error(error);
 dispatch(clearErrors); 
}  
if(reviewerror){
  alert.error(reviewerror);
  dispatch(clearErrors())
}
if(success){
  alert.success("Review Submitted Successfully")
  dispatch({type:NEW_REVIEW_RESET});
}
  dispatch(getproductdetails(id));
  },[dispatch,error,id,alert,success,reviewerror]);
  console.log("Product images:", product.images);
if(!product){
  return <div>No product found so please check .</div>
}
 const options = {
  edit: false,
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  size: window.innerWidth<600 ? 20:25,
  value:product.ratings || 0,
  isHalf: true,
 }

  if(loading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error:{error}</div>
  }

  return (
 <Fragment>
  {loading ? <Loader/>:(<Fragment>
    <MetaData title={`${product.name} --ECOMMERCE`}/>
    <div className='ProductDetails'>
     
      <div>
    
          {product && product.images  &&  product.images.map((items, i) =>(
     <img  className='CarouselImage'
     src={items.url}
          key={i}
            alt={`${i}Slide`}
            />
          ))}
   
      </div>
      
       <div className='detailsBlock-1'> 
    
    <h2>{product.name}</h2>
    <p>Product #{product._id}</p>
    <div className='detailsBlock-2'>
        <ReactStars {...options}/>
        <span>({product.numOfReviews} Reviews)</span>
    </div>
    <div className='detailsBlock-3'>
      <h1>{`₹${product.price}`}</h1>
      <div className='detailsBlock-3-1'>
      
      <div className='detailsBlock-3-1-1'>
        
         <button onClick={decreaseQuantity}>-</button>
         <input readOnly value={quantity} type='number'  />
         <button onClick={increaseQuantity}>+</button>
         
        </div> 
        <button disabled={product.stock <1 ?true: false} onClick={addToCartHandler}>Add to Cart</button>
        
      </div>
      <p>
        Status:
        <b className={product.stock< 1 ? "redColor": "greenColor"}>
          {product.Stock <1 ? "OutOfStock": "InStock"}
        </b>
      </p>
    </div>
      <div className='detailsBlock-4'>
        Descriptions:<p>{product.description}</p>
      </div>
      <button  onClick={submitReviewToggle} className='submitReview'>SubmitReview</button>
      </div>
        </div>
        
        <h3 className='reviewHeading' >REVIEWS</h3>
        <Dialog  aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
         <DialogTitle>Submit Review</DialogTitle>
         <DialogContent className='submitDialog'>
          <Rating
          onChange={(e)=>setRating(e.target.value)}
          value={rating}
          size="large"
          />
          <textarea className='submitDialogTextArea'
          cols="30"
          rows="5"
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          ></textarea>
         </DialogContent>
         <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
          <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>

         </DialogActions>
        </Dialog>
        {product.reviews && product.reviews[0] ? (
          <div className='reviews'>{product.reviews && product.reviews.map((reviewitems)=><ReviewCard review={reviewitems} />)}</div>
        )
      :(
        <p className='noReviews'>No Reviews Yet</p>
      )}
 </Fragment>)}
 </Fragment>

  )
}

export default ProductDetails



