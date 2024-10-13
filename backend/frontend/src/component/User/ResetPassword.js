import React,{useEffect,useState,Fragment} from 'react'
import "./ResetPassword.css"
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';
import { clearErrors, resetPassword} from '../../actions/UserAction';
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import {useParams} from "react-router-dom";

const ResetPassword = () => {
    const dispatch =  useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const{token}=   useParams();
    // const {user,isAuthenticated}= useSelector((state)=>state.user);
    const {error, success,loading} = useSelector((state)=>state.forgotPassword);
    const [password,setPassword] = useState();
  
    const [confirmPassword,setConfirmPassword] = useState();
    
    const resetPasswordSubmit = (e)=>{
     e.preventDefault();
     const  formData ={
     password: password,

     confirmPassword: confirmPassword,
     }
    dispatch(resetPassword(token,formData));
 }

 // use useEffect 
 useEffect(()=>{
     if(error){
         alert.error(error);
         dispatch(clearErrors());
     }
     if(success){
         alert.success("Password Updated Successfuly")
         Navigate("/login")
       
     }
 },[dispatch,error,alert,Navigate,success])
  return (
    <div>
      <Fragment>
    {loading ? (<Loader/>): (<Fragment>
    <MetaData title="Change Password"/>
<div className="resetPasswordContainer">
    <div className="resetPasswordBox">
        <h2 className='resetPasswordHeading'>Update Password</h2>
    <form  className="resetPasswordForm"  
   onSubmit={resetPasswordSubmit} 
  >
            <div className="loginPassword">
                <LockOpenIcon/>
                <input type="password" placeholder='New Password' required
                value={password}  onChange={(e)=>setPassword(e.target.value)}/>
            </div> 
            <div className="loginPassword">
                <LockIcon/>
                <input type="password" placeholder=' Confirm Password' required
                value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
  
    <input 
     type='submit'
     value="Update"
     className='resetPasswordBtn'
    //  disabled={loading ? true: false}
    />
  </form>
        </div>
        </div>
          </Fragment>)}
</Fragment>
    </div>
  )
}

export default ResetPassword
