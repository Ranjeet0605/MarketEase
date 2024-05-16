import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'

const  ProtectRoute=({element:Element})=> {
    const {loading,isAuthenticated,user} = useSelector((state)=>state.user)
  return (
    <Route
 
  element={
    loading ? (<Loader/>): isAuthenticated ?(
       <Element/>
    ) : (<Navigate to="/login"/>)     
        
  }
    />
  )
}

export default ProtectRoute
