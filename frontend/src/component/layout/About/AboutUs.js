import React from 'react'
import "./About.css"
import profile from "../../../image/profileimage.jpeg"
import { Typography } from '@mui/material'
const AboutUs = () => {
  return (
    <div  className='aboutUs'>
         <h2>About Us</h2>
        <img src={profile} alt='my profile'/>
         <p className='p'>Ranjeet Kumar</p>
         <a href='http://instagram.com/ranjeet0605'>Instagram</a>
         <a href='http://linkdin.com/ranjeet0605'>linkdin</a>
            <a href='http://facebook.com/ranjeet0605'>Facebook</a>
         <p className='p'>This is a sample webisted made by @Ranjeet kumar </p>

      
      
      
    </div>
  )
}

export default AboutUs
