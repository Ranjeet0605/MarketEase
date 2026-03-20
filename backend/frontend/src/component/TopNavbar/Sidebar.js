import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css"
import { BiHome } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const Sidebar = ({ showSidebar, onClose }) => {
    return (
        <>
            {/* Overlay */}
            <div 
                className={`sidebarOverlay ${showSidebar ? 'show' : ''}`} 
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
                
                <div className="sidebar-header">Menu</div>

                <div className="sidebar-content">
                    <Link to="/" onClick={onClose}>
                        <BiHome /> Home
                    </Link>

                    <Link to="/about" onClick={onClose}>
                        <AiOutlineInfoCircle /> About
                    </Link>

                    <Link to="/products" onClick={onClose}>
                        <MdProductionQuantityLimits /> Products
                    </Link>

                    <Link to="/contact" onClick={onClose}>
                        <FiPhone /> Contact
                    </Link>
                </div>

                <div className="sidebar-footer">
                    © 2026 E-commerce
                </div>
            </div>
        </>
    );
};


export default Sidebar;