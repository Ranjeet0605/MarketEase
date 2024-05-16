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
            <a href='http://instagram.com/ranjeet0605'>Instagram</a>
            <a href='http://linkdin.com/ranjeet0605'>linkdin</a>
            <a href='http://facebook.com/ranjeet0605'>Facebook</a>
        </div>
    </footer>
  )
}

export default Footer