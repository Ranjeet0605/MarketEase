import React,{useEffect,useState,Fragment} from 'react'
import "./UpdatePassword.css"
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,loaduser,updatePassword} from '../../actions/UserAction';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
const UpdatePassword =()=> {
    const dispatch =  useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const {user,isAuthenticated}= useSelector((state)=>state.user);
    const {error, isUpdated,loading} = useSelector((state)=>state.profile);
    const [oldPassword,setOldPassword] = useState();
    const [newPassword,setNewPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    
    const updatePasswordSubmit = (e)=>{
     e.preventDefault();
     const myform = new FormData();
     myform.set("oldPassword",oldPassword); 
     myform.set("newPassword",newPassword);
     myform.set("confirmPassword",confirmPassword);
    dispatch(updatePassword(myform));
 }

 // use useEffect 
 useEffect(()=>{
     if(error){
         alert.error(error);
         dispatch(clearErrors());
     }
     if(isUpdated){
         alert.success("Password Updated Successfuly")
         Navigate("/account")
         dispatch({type:UPDATE_PASSWORD_RESET,})
     }
 },[dispatch,error,alert,Navigate,isUpdated,user])
  return (
    <Fragment>
    {loading ? (<Loader/>): ( isAuthenticated &&<Fragment>
    <MetaData title="Change Password"/>
<div className="updatePasswordContainer">
    <div className="updatePasswordBox">
        <h2 className='updatePasswordHeading'>Update Password</h2>
    <form  className="updatePasswordForm" encType='multipart/form-data' 
   onSubmit={updatePasswordSubmit}
  >
     <div className="loginPassword">
                <VpnKeyIcon/>
                <input type="password" placeholder='Old Password' required
                value={oldPassword}  onChange={(e)=>setOldPassword(e.target.value)}/>
            </div>
            <div className="loginPassword">
                <LockOpenIcon/>
                <input type="password" placeholder='New Password' required
                value={newPassword}  onChange={(e)=>setNewPassword(e.target.value)}/>
            </div> 
            <div className="loginPassword">
                <LockIcon/>
                <input type="password" placeholder=' Confirm Password' required
                value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
  
    <input 
     type='submit'
     value="Update"
     className='updatePasswordBtn'
    //  disabled={loading ? true: false}
    />
  </form>
        </div>
        </div>
          </Fragment>)}
</Fragment>
  )
}

export default UpdatePassword
