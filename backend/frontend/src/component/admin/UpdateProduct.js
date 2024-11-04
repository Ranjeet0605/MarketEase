import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors,getproductdetails, updateProduct } from '../../actions/ProductAction';

import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import DescriptionIcon from "@material-ui/icons/Description"
import StorageIcon from "@material-ui/icons/Storage"
import SpellcheckIcon from "@material-ui/icons/Spellcheck"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import Sidebar from './Sidebar';
import "./NewProduct.css";

import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';



const UpdateProduct = () => {
    const dispatch = useDispatch();
    const {id}=useParams();
    const alert = useAlert();
    const Navigate = useNavigate();
    const {loading,error:updateError,isUpdated} = useSelector((state)=>state.DeleteProduct);
    const {error,product} = useSelector((state)=>state.productDetails);
    const[name,setName]= useState("");
    const[price,setPrice] = useState(0);
    const[description,setDescription] = useState("");
    const[category,setCategory] = useState(""); 
    const[Stock,setStock] = useState(0);
    const[images,setImages]=useState([]);
    const[oldImages,setOldImages]= useState([]);
    const[imagePreview,setImagePreview] = useState([]);
    const categories =[
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];
    useEffect(()=>{
        if(product && product._id !== id){
            dispatch(getproductdetails(id));
        }else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price)
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Product Updated Successfully");
            Navigate("/admin/product");
            dispatch({type:UPDATE_PRODUCT_RESET});
        }
    },[dispatch,alert,updateError,error,Navigate,isUpdated,id,product])

    const UpdateProductSubmitHandler=(e)=>{
    e.preventDefault();
    const myform = new FormData();
    myform.set("name",name);
    myform.set("price",price);
    myform.set("description",description);
    myform.set("category",category);
    myform.set("stock",Stock);
    images.forEach((image)=>{
        myform.append("images",image);
    })
   dispatch(updateProduct(id,myform));
    }
    const UpdateProductImagesChange = (e)=>{
        const files = Array.from(e.target.files) // make image in to in array form
         setImages([]);
         setImagePreview([]);
         files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagePreview((old)=>[...old,reader.result])
                    setImages((old)=>[...old,reader.result]);
                }
            }
            reader.readAsDataURL(file);
         })
    }
  return (
   <Fragment>
    <MetaData title="Create Product"/>
    <div className="dashboard">
        <Sidebar/>
    <div className="newProductContainer">
        <form className="createProductForm" oncType="multipart/form-data"
        onSubmit={UpdateProductSubmitHandler}>
            <h1>Create Product</h1>
        <div>
            <SpellcheckIcon/>
            <input type='text' placeholder='Product Name'
            required
            value={name}
            onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <AttachMoneyIcon/>
            <input type='number' placeholder='Price'
            required
            value={price}
            onChange={(e)=>setPrice(e.target.value)}/>
        </div>
        <div>
            <DescriptionIcon/>
            <textarea  placeholder='Product Description'
            
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            
            cols={"30"}
            rows={"1"}></textarea>
        </div>
        <div>
            <AccountTreeIcon/>
            <select value={category} onChange={(e)=>setCategory(e.target.value)
            }>
 <option value="">Choose Category</option>

 {categories.map((cate)=>(
    <option key={cate} value={cate}>{cate}</option>
 ))}
            </select>
        </div>
        <div>
            <StorageIcon/>
            <input 
            type='number'
            placeholder='Stock'
            required
            value={Stock}
            onChange={(e)=>setStock(e.target.value)}/>
        </div>
        <div id='createProductFormFile'>
          
            <input 
            type='file'
            name='avatar'
            accept='image/*'
             onChange={UpdateProductImagesChange}
            multiple />

        </div>
        <div id='createProductFormImage'>
            { oldImages && oldImages.map((image,index)=>(
                <img key={index} src={image.url} alt='old Product Preview' />
            ))}
        </div>

        <div id='createProductFormImage'>
            {imagePreview.map((image,index)=>(
                <img key={index} src={image} alt='Product Preview' />
            ))}
        </div>
        <Button id="createProductBtn" type='submit' disabled={loading? true:false}>Create</Button>
        </form>
    </div>
    </div>
   </Fragment>
  )
}

export default UpdateProduct
