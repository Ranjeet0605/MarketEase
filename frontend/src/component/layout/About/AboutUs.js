import React from 'react'
import "./About.css"
import profile from "../../../image/profileimage.jpeg"

const AboutUs = () => {
  return (
    <div  className='aboutUs'>
         <h2>About Us</h2>
        <img src={profile} alt='my profile'/>
         <p className='p'>Ranjeet Kumar</p>
         <a href='http://instagram.com/ranjeet_0605'>Instagram</a>
            <a href='https://www.linkedin.com/in/ranjeet-kumar-316a17231/'>linkedin</a>
            <a href='https://www.facebook.com/profile.php?id=100028464884635'>Facebook</a>
         <p className='p'>This is a sample webisted made by @Ranjeet kumar </p>

      
      
      
    </div>
  )
}

export default AboutUs
