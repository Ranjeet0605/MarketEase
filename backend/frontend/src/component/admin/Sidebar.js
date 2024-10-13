import React from 'react'
import { TreeView ,TreeItem} from '@material-ui/lab'
import Dashboard from '@mui/icons-material/Dashboard'
import { Link } from 'react-router-dom'
import logo from "../../image/logo.png"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import PostAddIcon from "@material-ui/icons/PostAdd"
import AddIcon from "@material-ui/icons/Add"
import ImportExportIcon from "@material-ui/icons/ImportExport"
import ListAltIcon from "@material-ui/icons/ListAlt"
import PeopleIcon from "@material-ui/icons/People"
import RateReviewIcon from "@material-ui/icons/RateReview"
import "./Sidebar.css";
const Sidebar = () => {
  return (
   <div className="sidebartext">
    <Link to="/">
        <img src={logo} alt='e-commerce'/>
    </Link>
    
    <Link to="/admin/dashboard">
    <p> <Dashboard/>Dashboard</p>
    </Link>

    <Link>
       <TreeView defaultCollapseIcon={<ExpandMoreIcon/>}
          defaultExpandIcon={<ImportExportIcon/>}
       >
      <TreeItem nodeId='1' label="Products">
         <Link to="/admin/product">
            <TreeItem nodeId='2' label="ALL" icon={<PostAddIcon/>}/>
         </Link>
         <Link to="/admin/create/product">
            <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}/>
         </Link>

      </TreeItem>
       </TreeView>
    </Link>
    <Link to="/admin/orders">
    <p> 
      <ListAltIcon/>
      Orders
    </p>
    </Link>
    <Link to="/admin/users">
      <p>
         <PeopleIcon/> Users
      </p>
    </Link>
    <Link to="/admin/reviews">
      <p><RateReviewIcon/>
      Reviews
      </p>
    </Link>
 </div>
  )
}


export default Sidebar
