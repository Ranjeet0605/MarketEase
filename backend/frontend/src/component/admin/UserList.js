import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import "./ProductList.css"
import { DataGrid } from '@material-ui/data-grid'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button } from '@mui/material'
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { clearErrors, deleteUser, getAllUsers } from '../../actions/UserAction'
import { DELETE_USER_RESET } from '../../constants/userConstant'



const UserList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error,users} = useSelector((state)=>state.allUsers);
    const{error:deleteError,isDeleted,message} = useSelector((state)=>state.updateanddeleteUser)
   const deleteUserHandler=(id)=>{
    dispatch(deleteUser(id));
   }

   useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors);

    }
    if(deleteError){
      alert.error(deleteError)
      dispatch(clearErrors());
    }
    if(isDeleted){
      alert.success(message)
      navigate("/admin/user")
      dispatch({type:DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
}, [dispatch,alert, error,navigate,deleteError,isDeleted,message])

   const columns =[
    {field:"id",headerName:"User ID",minWidth:180,flex:0.5},
    
    {field:"email",headerName:"Email",minWidth:180,flex:0.5},
    {field:"name",headerName:"Name",minWidth:180,flex:0.5},
    {field:"role",headerName:"Role" ,minWidth:180,flex:0.5,
    cellClassName:(params)=>{
      return params.getValue(params.id,"role") === "admin"?"greenColor":"redColor"
    }
    },
    {field:"actions",headerName:"Actions", type:"number",minWidth:180,flex:0.5,sortable:false,

   renderCell:(params)=>{
    return(
        <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}><EditIcon/></Link>
        <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
        </Button>
      
        </Fragment>
    )
   }
},

   ]

   const rows=
   users && users.length>0 ? users.map((item,index)=>({
       id:item._id,
       email:item.email,
       name:item.name,
       role:item.role,
   })):[];
  



  return (
    <Fragment>
        <MetaData title={`ALL USERS - Admin`}/>
        <div className="dashboard">
         <Sidebar/>
         <div className="productListContainer">
            <h1 id='productListHeading'>ALL USERS</h1>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
             className='productListTable'
             autoHeight
            />

         </div>
        </div>
    </Fragment>
  )
}


export default UserList
