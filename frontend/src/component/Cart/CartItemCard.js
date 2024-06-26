import React from 'react'
import { Link } from 'react-router-dom'
import "./CartItemCard.css"
const CartItemCard = ({item,deletecartItem}) => {
  return (
    <div className="CartItemCard">
        <img src={item.images} alt="ssa" />
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price:₹${item.price} `}</span>
            <p onClick={()=>deletecartItem(item.product)}>Remove</p>
        </div>
    </div>
  )
}

export default CartItemCard
