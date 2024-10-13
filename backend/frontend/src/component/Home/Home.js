import React, { Fragment, useEffect } from 'react'
import { LuMouse } from "react-icons/lu";
import "./Home.css";
import Product from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct} from '../../actions/ProductAction';
import {useAlert} from "react-alert";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';

const Home=()=> {
  const alert = useAlert();
  const dispatch = useDispatch();
  const{loading,error,products} = useSelector((state)=>state.products)
  useEffect(()=>{
    if(error)
{
  alert.error(error);
  dispatch(clearErrors);
}    dispatch(getProduct());
  },[dispatch,error,alert]);


  return (
    <Fragment>
      {loading ?(
        <Loader/>
      ) : (
    <>
    <MetaData title="E-COMMERCE"/>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
            <button>
                Scroll <LuMouse/>
            </button>
        </a>
      </div>
      <h2 className='homeHeading'>Featured Products</h2>
      <div className="container" id='container'>
         {products && products.map((items)=> <Product items={items}/>)}

      </div>
   
    </>
    )}
    </Fragment>
  )
}

export default Home
