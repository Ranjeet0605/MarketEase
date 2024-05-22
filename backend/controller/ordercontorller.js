const catchAsyncError = require("../middleware/catchAsyncError");
const orderSchema = require("../models/ordermodels")
const productSchema = require("../models/productmodel");
const { ErrorHandler } = require("../utils/errorhandling")
const mongoose = require("mongoose");

// create new order
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
        shippingInfo,
        orderInfo,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    // console.log(req.user._id);
    const order = await orderSchema.create({
        shippingInfo, orderInfo,paymentInfo,
        itemPrice,taxPrice,shippingPrice,
         totalPrice, 
         paidAt: Date.now(),
         user:req.user._id,
    });
res.status(200).json({
    success: true,
    order
})
})
// get single order
 exports.getsingleorder = catchAsyncError(async(req,res,next)=>{
    // we use here populate method for using for when this query execute your user and 
    const userId = req.params.id === "me" ? req.user._id : req.params.id;
    const order = await orderSchema.findById(userId).populate(
        "user",
        "name email"
    ); 
    if(!order){
        return next(new ErrorHandler(`Order not found with this id`,404))
    }
    res.status(200).json({
        success:true,
        order,
    });
 })

 //get logged in user orders
  exports.myOrders = catchAsyncError(async(req,res,next)=>{
    

    const orders = await orderSchema.find({user:req.user._id});
   if(!orders){
    return next(new ErrorHandler(`oreders can't get`,404))
   }
    res.status(200).json({
        success:true,
        orders,
    })
  })

//   // getall orders --admin
  exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.find();
   if(!orders){
    return next(new ErrorHandler(`orders are not found`,404))
   }
   
    let totalAmount = 0;
  orders.forEach((order)=>{
    totalAmount+=order.totalPrice
  })
  res.status(200).json({
    success:true,
    totalAmount,                                                                                                                                                                                                                                                                                                                                                                                                                                     
    orders,
  })
  })

//   // update order status --admin

  exports.updateOrders = catchAsyncError(async(req,res,next)=>{
    const order = await orderSchema.findById(req.params.id);
   if(!order){
    return next(new ErrorHandler(`orders are not found`,404))
   }
   if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("Order not found width this Id",404));
   }
   if(order.orderStatus==="Shipped"){
    order.orderInfo.forEach(async(order)=>{
      await updateStock(order.product, order.quantity);
     })
   } 


   order.orderStatus = req.body.status;
   if(req.body.status=== "Delivered"){
    order.deliverAt = Date.now();
   }
   await order.save({validateforSave:false})
  res.status(200).json({
    success:true,
  })
  })
  async function updateStock(id, quantity){
    const product = await productSchema.findById(id);
    if(!product){
      throw new Error(`Product with ID ${id} not found`)
    }
    product.stock-=quantity;
    await product.save({validateBeforeSave: false});
  }

//   // delete orders-- admin
  exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await orderSchema.deleteOne({_id:req.params.id})

    res.status(200).json({
        success:true,

    })
  })