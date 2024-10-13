import React, { Fragment, useEffect, useState } from 'react'
import { clearErrors, getProduct } from '../../actions/ProductAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useSelector,useDispatch } from 'react-redux';
import Pagination from "react-js-pagination";
// import { load } from 'webfontloader';
import {useAlert} from "react-alert";
import "./Products.css"
import { useParams } from 'react-router-dom';
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography';
const categoris = [
   "apple",
   "hp",
   "samsung",
   "lenevo",
   "tshirt",
   "footwear",
   "laptop",
];
const  Products=({location})=> {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const[price, setPrice] = useState([0,60000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const {keyword} = useParams();
    const alert = useAlert();
    const{loading,error,products,productCount,resultperpage} = useSelector((state)=>state.products)
     const setCurrentPageNo = (e)=>{
      setCurrentPage(e);
     }
     const priceHandler = (event,newprice)=>{
      setPrice(newprice);
     }
    useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
   },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);
    return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>
        <h2 className='productsHeading'>Products</h2> 
        <div className="products">
            {products && products.map((product)=>(
                <ProductCard key={product._id} items={product}/>
            ))} 
            </div>  
            {/* for price filter slider  */}
         {keyword &&   <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
               value={price}
               onChange={priceHandler}
               valueLabelDisplay="auto"
               aria-labelledby="range-slider"
               min={0}
               max={60000}
              />

              <Typography>Categories</Typography>
              <ul className='categoryBox'>
                {categoris.map((category)=>(
                  <li className='category-link'
                  key={category}
                  onClick={()=>setCategory(category)}
                  >
                     {category}
                  </li>
                ))}
              </ul>
              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
             <Slider
               value={ratings}
               onChange={(e,newRatings)=>{
                setRatings(newRatings);
               }}
               aria-labelledby="continuous-slider"
               valueLabelDisplay='auto'
               min={0}
               max={5}
              />
              </fieldset>
            </div>}
              {resultperpage < productCount && (
                <div className="paginationBox">
              <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultperpage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
             linkClass="page-link"
             activeClass='pageItemActive'
             activeLinkClass='pageLinkActive'

              />
              </div> 
              )}
            </Fragment>}
    </Fragment>
  )
}

export default Products 