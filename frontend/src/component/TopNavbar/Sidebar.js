import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css"

const Sidebar = ({ showSidebar, onClose }) => {
    return (
        <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
            <div className="sidebar-content">
                <Link to="/" onClick={onClose}>Home</Link>
                <Link to="/about" onClick={onClose}>About</Link>
                <Link to="/products" onClick={onClose}>Product</Link>
                <Link to="/contact" onClick={onClose}>Contact</Link>
            </div>
        </div>
    );
};

export default Sidebar;