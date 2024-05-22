const catchAsyncError = require("../middleware/catchAsyncError");
const productSchema = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const { ErrorHandler } = require("../utils/errorhandling");
const cloudinary = require("cloudinary");
// create product
exports.createproduct = catchAsyncError(async(req,res,next)=>{
  //add cloudinary 
let images =[];
if(typeof req.body.images === "string"){
  images.push(req.body.images);
}
else{
  images=req.body.images
}
const imagesLink =[];
  for(let i =0; i<images.length; i++){
    const result = await cloudinary.v2.uploader.upload(images[i],{
      folder:"products",
    });
    imagesLink.push({
      public_id:result.public_id,
      url:result.secure_url
    })
  }

  req.body.images=imagesLink;
   req.body.user = req.user.id
    const product = await productSchema.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})
// get all product 
 exports.getproduct = catchAsyncError(async(req,res,next)=>{
  // return next(new ErrorHandler("This is my temp error",500)); 
  
    const resultperpage = 8;
    let keyword = req.query.keyword || '';
    const productCount = await productSchema.countDocuments();
    const apifeatures = new ApiFeatures(productSchema.find(), req.query).search(keyword).filter().pagination(resultperpage)
    const products = await apifeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultperpage,
    })
 })

 // get all product (admin)

 exports.getadminproduct = catchAsyncError(async(req,res,next)=>{
  // return next(new ErrorHandler("This is my temp error",500)); 
  
   const  products = await productSchema.find();
    
    res.status(200).json({
        success: true,
        products,
      
    })
 })



 // getproduct details
 exports.getproductdetails = catchAsyncError(async(req,res,next)=>{
 
    const product = await productSchema.findById(req.params.id)
    if(!product){
       return next(new ErrorHandler("product not found",404))
    }

    res.status(200).json({
        success: true,
        product
    })
 })
 // product update 
  exports.updateproducts = catchAsyncError(async(req,res,next)=>{
    
  const product =  await productSchema.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("product not found",404))

    }
    // Images Start Here
    let images=[];
    if(typeof req.body.images === "string"){
      images.push(req.body.images);
    }else{
      images=req.body.images;
    }
    if(images!==undefined){
      //deleting Images from Cloundinary
      for(let i = 0; i<product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
      }
      const imagesLink=[];
      for(let i = 0; i<images.length;i++){
         const result = await cloudinary.v2.uploader.upload(images[i],{
          folder:"products",
         })
         imagesLink.push({
          public_id:result.public_id,
          url:result.secure_url,
         })
      }
      req.body.images = imagesLink;
    }
    
   const productupdated = await productSchema.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success: true,
          productupdated
    })

  })
  // delete product by --admin
  exports.deleteProduct = catchAsyncError(async(req,res,next)=>{
    const product = await productSchema.findByIdAndDelete(req.params.id)
     if(!product){
        return next(new ErrorHandler("product not found",404))

     }
     // deleting images from cloudinary
     for(let i = 0; i<product.images.length; i++){
      await cloudinary.v2.uploader.destroy(product.images[i].public_id)
     }
       res.status(200).json({
        success:true,
        message: "product has been deleted."
       })
  })
  // create New Review or update the review
  exports.creatProductReview = catchAsyncError(async(req,res,next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }
    // console.log(review);
    // console.log(productId);
     const product = await productSchema.findById(productId);
      const isReviewed =  product.reviews.find((rev)=>{
        rev.user.toString()===rev.user._id.toString()
        // console.log(rev.user.toString());
      }
      )
    //   console.log(req.user._id.toString());
    //  console.log(isReviewed);
     if(isReviewed){
         product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
            rev.rating=rating;
            rev.comment=comment;
           }
         })
     }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
     }
     let avg = 0;
     // 4,5,6,7;
    product.reviews.forEach((rev)=>{
        avg+= rev.rating;
    })
    product.ratings = avg/product.reviews.length;
    await product.save({validateBeforeSave:false});
   res.status(200).json({
    success:true,
   });
  });
  // get All Reviews of a product

  exports.getProductreviews = catchAsyncError(async(req,res,next)=>{
  
    const product = await productSchema.findById(req.query.ProductId);
    // console.log(product);
    if(!product){
        return next(new ErrorHandler("product not found",404));
    } 
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
  });
  // delete  Reviews
  exports.delteteReviews= catchAsyncError(async(req,res,next)=>{
    const product = await productSchema.findById(req.query.productId);
    if(!product){
  return next(new ErrorHandler("product not found",404));
    }
    const reviews = product.reviews.filter((rev)=> rev._id.toString()!== req.query.id.toString());
   
  let avg=0;
   reviews.forEach((rev)=>{
   avg+= rev.rating
  })
  let = rating=0;
  if(reviews.length===0){
    rating=0;
  }else{
    rating= avg/ reviews.length;
  }

  const numOfReviews = reviews.length;

  
  await productSchema.findByIdAndUpdate(req.query.productId,{
    ratings:rating,
    numOfReviews:reviews.length,
    reviews,
   
  },
  {
    new : true,
    runValidators:false,
    useFindAndModify:false,
  },)
  res.status(200).json({
    success: true,
  })
})

