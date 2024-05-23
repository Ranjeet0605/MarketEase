import React, { useEffect, useState } from 'react';

import { RiAccountBoxFill } from 'react-icons/ri';
import { BiCart, BiHome } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.png';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Navbar.css';
import Search from '../Product/Search';

const Navbar = () => {
   
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };

    const closeSidebar = () => {
        setShowSidebar(false);
    };

    const [windowWidth,setWindowWidth] = useState(window.innerWidth);
      useEffect(()=>{
        const handleResize=()=>{
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize',handleResize);
        return()=>{
            window.removeEventListener('resize',handleResize)
        }
      },[])
    return (
        <div className="topcontainer">
            <div className="top-materrial">
                <Link to="/">
                <span className="E-commerce">
                   { windowWidth <=600? <BiHome style={{ fontSize: '30px', color:"white" }}/>:<img className="image" src={logo} alt="e-commerce" />}
                </span>
                </Link>
            </div>

            <div className="searchNav">
                 <Search/>
            </div>

            <div className="leftcontainer">
                <div className="person">
                    <Link to="/login">
                    <RiAccountBoxFill style={{ fontSize: '30px' }} />
                    </Link>
                </div>
                <div className="cart">
                    <Link to="/cart">
                    <BiCart style={{ fontSize: '30px' }} />
                    </Link>
                </div>
                <div className="cart">
                    <span onClick={()=>handleSidebarToggle()}>&#9776;</span>

                </div>
            </div>

            <Sidebar showSidebar={showSidebar} onClose={closeSidebar} />
        </div>
    );
};

export default Navbar;