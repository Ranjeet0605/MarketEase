import React, { useState ,useEffect,Fragment} from 'react'
import "./forgotPassword.css"
import Loader from '../layout/Loader/Loader';

import EmailIcon from '@mui/icons-material/Email';

import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,forgotPassword} from '../../actions/UserAction';
import { useAlert } from 'react-alert';

import MetaData from '../layout/MetaData';
const ForgotPassword = () => {

    const dispatch =  useDispatch();
    const alert = useAlert();
     

    const {error, message,loading} = useSelector((state)=>state.forgotPassword);
   
    const[email,setEmail] = useState("");
    
    const forgotPasswordSubmit = (e)=>{
     e.preventDefault();
     const myform = new FormData();
     
     myform.set("email",email);
     
    dispatch(forgotPassword(myform));
 }

 
 // use useEffect 
 useEffect(()=>{
   
     if(error){
         alert.error(error);
         dispatch(clearErrors());
     }
     if(message){
         alert.success(message)
        

     }
 },[dispatch,error,alert,message])
  return (
    <Fragment>
    {loading ? (<Loader/>): (<Fragment>
    <MetaData title="Forgot Password"/>
<div className="forgotPasswordContainer">
    <div className="forgotPasswordBox">
        <h2 className='forgotPasswordHeading'>Forgot Password</h2>
    <form  className="forgotPasswordForm" 
   onSubmit={forgotPasswordSubmit}
  >
  
    <div className="forgotPasswordEmail">
    <EmailIcon/>
    <input type="email" placeholder="Email" required name="email" value={email}
             onChange={(e)=>setEmail(e.target.value)}
            />
    </div>
  
 
    <input 
     type='submit'
     value="Update"
     className='forgotPasswordBtn'
    //  disabled={loading ? true: false}
    />
  </form>
        </div>
        </div>
          </Fragment>)}
</Fragment>
  )
}

export default ForgotPassword
