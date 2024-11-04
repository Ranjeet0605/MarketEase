import React from 'react'
import ReactStars from "react-star-rating-component";
import "./Product.css";
import { Link} from 'react-router-dom';

const ProductCard=({items})=> {
  const  options ={
    edit: false,
    color:"rgba(20,20,20,0.1)",
   
    activeColor: "tomato",
    size: window.innerWidth<600 ? 20: 25,
    value: items.ratings,
    
    precision:0.5,
  };
  return (
    <Link className="productCard" to={`/products/details/${items._id}`}>
   <img src={items.images[0].url} alt={items.name}/>
   <p>{items.name}</p>
  <div>
    <ReactStars  isHalf={true}{...options}/><span>{items.numOfReviews}Reviews</span>
  </div>
   <span>{`₹${items.price}`}</span>

    </Link>
  )
}

export default ProductCard