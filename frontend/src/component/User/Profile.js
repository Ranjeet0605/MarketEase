import React, { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader/Loader'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import "./Profile.css";
const  Profile=()=> {
  const Navigate = useNavigate();
const {loading,user,isAuthenticated} = useSelector((state)=>state.user);
useEffect(()=>{
    if(isAuthenticated===false){
        Navigate("/login");
    }
},[Navigate,isAuthenticated]);
  return (
    <Fragment>
        {loading ? (<Loader/>):( isAuthenticated &&
       <Fragment >
   <MetaData title={`${ user && user.name}'s profile`}/>
   <div className="profileContainer">
    <div>
        <h1>My Profile</h1>
        <img src={isAuthenticated && user.avatar.url? user.avatar.url: "./Profile.png" } alt={ isAuthenticated && user.name}/>
        <Link to="/me/update">Edit Profile</Link>
    </div>
    <div>
        <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
        </div>
        <div>
            <h4>Email</h4>
            <p>{user.email}</p>
        </div>
        <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substring(0,10)}</p>
        </div>
        <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
        </div>
    </div>
   </div>
   </Fragment>)}
   
   </Fragment>
  )
}

export default Profile
