

import React from 'react'
import profilePng from "../../image/Profile.png";
import ReactStars from "react-star-rating-component"


const  ReviewCard=({review})=> {
    const options = {
        edit: false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tamato",
        size: window.innerWidth<600 ? 20:25,
        value:review.rating || 0,
       
        precision:0.5,
       }
    return (
    <div className='reviewsCard'>
        <img src={profilePng} alt="User"/>
        <p>{review.name}</p>
        <ReactStars isHalf={true} {...options}/>
        <span>{review.comment}</span>
    </div>
    )
}

export default ReviewCard

