import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import VerifiedIcon  from "@material-ui/icons/VerifiedUser";
import PersonIcon from "@material-ui/icons/Person"
import EmailIcon from '@mui/icons-material/Email';

import Sidebar from './Sidebar';
import "./NewProduct.css";
import { UPDATE_USER_RESET } from '../../constants/userConstant';

import { getuserDetails, updateUser,clearErrors } from '../../actions/UserAction';
import Loader from '../layout/Loader/Loader';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const Navigate = useNavigate();
    const {id}=useParams();
    const {loading:updateLoading,error:errorUpdated,isUpdated} = useSelector((state)=>state.updateanddeleteUser);
    const {loading,user,error} = useSelector((state)=>state.userDetails);

   
    const[name,setName]= useState("");
    const[email,setEmail] = useState("");
    const[role,setRole]=useState("");
  
    
    useEffect(()=>{
        if(user && user._id !== id){
            dispatch(getuserDetails(id));
        }else{
            setName(user.name);
           setEmail(user.email);
           setRole(user.role);
            
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
         if(errorUpdated){
            alert.error(error)
            dispatch(clearErrors());
         }
        if(isUpdated){
            alert.success("User updated Successfully");
            Navigate("/admin/users");
            dispatch({type:UPDATE_USER_RESET});
        }
    },[dispatch,alert,error,Navigate,isUpdated,id,user,errorUpdated])

    const createProductSubmitHandler=(e)=>{
    e.preventDefault();
    const myform = new FormData();
    myform.set("name",name);
    myform.set("email",email);
    myform.set("role",role);
   
   dispatch(updateUser(id,myform));
    }
    
  return (
   <Fragment>
    <MetaData title="Update User"/>
    <div className="dashboard">
        <Sidebar/>
    <div className="newProductContainer">
       {loading?<Loader/>:(<Fragment>
        <form className="createProductForm" oncType="multipart/form-data"
        onSubmit={createProductSubmitHandler}>
            <h1>Create Product</h1>
        <div>
            <PersonIcon/>
            <input type='text' placeholder='Product Name'
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <EmailIcon/>
            <input type='email' placeholder='Email'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
        </div>
      
        <div>
            <VerifiedIcon/>
            <select value={role} onChange={(e)=>setRole(e.target.value)
            }>
 <option value="">Choose Role</option>
    <option  value="admin">admin</option>
    <option  value="user">user</option>
            </select>
        </div>
       
        <Button id="createProductBtn" type='submit' 
        disabled={updateLoading? true:false || role===""?true:false}>Update</Button>
        </form>
       </Fragment>)}
    </div>
    </div>
   </Fragment>
  )
}

export default UpdateUser
