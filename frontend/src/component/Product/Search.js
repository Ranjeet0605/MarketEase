
import React, { Fragment, useState } from 'react'
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../actions/ProductAction';
import MetaData from '../layout/MetaData';

const Search=()=> {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [keyword ,setKeyword]=useState("");
    const seachSumitHandler = (e)=>{
        
        e.preventDefault();
        const trimmedKeyword = keyword.trim();
        if(trimmedKeyword){
            dispatch(getProduct(trimmedKeyword))
            navigate(`/products/${trimmedKeyword}`);
        }else{
            navigate("/products")
        }
    };
    const handleKeywordChange=(e)=>{
       
        setKeyword(e.target.value);

    }
  
  return (
   <Fragment>
    <MetaData title="Search A product -- ECOMMERCE"/>
    <form  className="searchBox" onSubmit={seachSumitHandler}>
        <input
         type='text'
         placeholder='Search a Product ...'
        
         onChange={handleKeywordChange}
         value={keyword}
        />
        <button type='submit' ><CiSearch style={{color:"black",fontSize:"10"}}/></button>
       
    </form>
   </Fragment>
  )
}

export default Search