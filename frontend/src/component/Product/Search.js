
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
        <div className='search-container'>
        <input
         type='text'
         placeholder='Search a Product ...'
         className='search-input'
         onChange={handleKeywordChange}
         value={keyword}
        />
        <button type='submit' className='search-button' ><CiSearch className='search-icon' style={{color:"black",fontSize:"10"}}/></button>
        </div>
    </form>
   </Fragment>
  )
}

export default Search