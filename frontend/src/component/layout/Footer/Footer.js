import React from 'react'
import playStore  from "../../../image/playstore.png"
import appStore from "../../../image/Appstore.png"
import "./Footer.css"
const Footer=()=> {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
          <img src={playStore} alt='playstore'/>
          <img src={appStore} alt='appstore'/>
        </div>
        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; Ranjeet kumar</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href='http://instagram.com/ranjeet_0605'>Instagram</a>
            <a href='https://www.linkedin.com/in/ranjeet-kumar-316a17231/'>linkedin</a>
            <a href='https://www.facebook.com/profile.php?id=100028464884635'>Facebook</a>
        </div>
    </footer>
  )
}

export default Footer