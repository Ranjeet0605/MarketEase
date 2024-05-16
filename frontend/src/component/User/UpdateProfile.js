import React, { useState ,useEffect,Fragment} from 'react'
import "./UpdateProfile.css"
import Loader from '../layout/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

import FaceIcon from '@mui/icons-material/Face';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,loaduser,updateProfile} from '../../actions/UserAction';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';
const UpdateProfile=()=> {
   const dispatch =  useDispatch();
   const alert = useAlert();
   const Navigate = useNavigate();
   const {user,isAuthenticated}= useSelector((state)=>state.user);
   const {error, isUpdated,loading} = useSelector((state)=>state.profile);
   const [name,setName] = useState("");
   const[email,setEmail] = useState("");
   const[avatar,setAvatar] = useState();
   const[avatarPreview,setAvatarPreview] = useState("./Profile.png");
   const updateProfileSubmit = (e)=>{
    e.preventDefault();
    const myform = new FormData();
    myform.set("name",name); 
    myform.set("email",email);
    myform.set("avatar",avatar);
   dispatch(updateProfile(myform));
}
const updateProfileDataChange=(e)=>{
  
        const reader = new FileReader();
        reader.onload=()=>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]); 
    
}

// use useEffect 
useEffect(()=>{
    if(isAuthenticated && user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url)
    }
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Profile Updated Successfuly")
        dispatch(loaduser());
        Navigate("/account")
        dispatch({type:UPDATE_PROFILE_RESET,})
    }
},[dispatch,error,alert,Navigate,isUpdated,user])
  return (
    <Fragment>
        {loading ? (<Loader/>): ( isAuthenticated &&<Fragment>
        <MetaData title="Update Profile"/>
    <div className="updateProfileContainer">
        <div className="updateProfileBox">
            <h2 className='updateProfileHeading'>Update Profile</h2>
        <form  className="updateProfileForm" encType='multipart/form-data' 
       onSubmit={updateProfileSubmit}
      >
        <div className="updateProfileName">
            <FaceIcon/>
            <input type="text" placeholder="Name" required value={name}
            name='name'
                 onChange={(e)=>setName(e.target.value)}
                />
        </div>
        <div className="updateProfileEmail">
        <EmailIcon/>
        <input type="email" placeholder="Email" required name="email" value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
      
        <div id="updateProfileImage">
            <img src={avatarPreview} alt="Avatar Preview"/>
            <input type="file"
            name='avatar'
            accept='image/'
            onChange={updateProfileDataChange}
            />
        </div>
        <input 
         type='submit'
         value="Update"
         className='updateProfileBtn'
        //  disabled={loading ? true: false}
        />
      </form>
            </div>
            </div>
              </Fragment>)}
    </Fragment>
  )
}

export default UpdateProfile
