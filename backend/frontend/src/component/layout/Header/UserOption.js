import React, { Fragment, useState } from 'react'
import "./Header.css";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import Backdrop from "@material-ui/core/Backdrop"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { BiCart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/UserAction';



const  UserOption=({user})=> {
    const[open,setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {cartItem}  = useSelector((state)=>state.cart);
    const options = [
      {icon:<ListAltIcon/>, name:"Orders",func:orders},
      {icon: <PersonIcon/>, name:"Profile",func:account},
      {icon: <BiCart style={{fontSize:30, color:cartItem.length>0 ?"tomato":"unset"} }/>, name:`Cart(${cartItem.length})`,func:cart},

      {icon: <ExitToAppIcon/>, name:"Logout",func:logoutUser},
    ];

    if(user && user && user.role ==="admin"){
      options.unshift({
        icon:<DashboardIcon/>,
        name:"Dashboard",
        func:dashboard,
      })
    }
    function dashboard(){
      navigate("/admin/dashboard")
    }
    function orders(){
      navigate("/orders")
    }
    function account(){
      navigate("/account")
    }
    function cart(){
      navigate("/cart")
    }
    function logoutUser(){
dispatch(logout());
alert.success("Logout Successfully"); 
    }
  return (
   <Fragment>
    <Backdrop open={open} style={{zIndex:"10"}}/>
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        style={{zIndex:"11"}}
        direction='down'
        className='speedDial'
        icon={ 
     <img src={ user.avatar.url} alt="Profile" className="speedDialIcon"/> }
       >
       {options.map((item)=>(
   
        <SpeedDialAction key={item} icon={item.icon} tooltipTitle={item.name}
        onClick={item.func} tooltipOpen={window.innerWidth<=600?true:false}/>
       ))}
         
    </SpeedDial>
   </Fragment>
  )
}

export default UserOption