const { ErrorHandler } = require("../utils/errorhandling");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const userSchema = require("../models/usermodel");
exports.isAuthenticatedUser  = catchAsyncError(async(req,res,next)=>{
    
    const{token} = req.cookies;
    // console.log(token);
   if(!token){
    return next(new ErrorHandler("please Login to access this resource",401));
   }
   const decodeData = jwt.verify(token,process.env.JWT_SECRET);
//    console.log(decodeData)
   req.user = await  userSchema.findById(decodeData.id);
   
//   console.log(req.user);
//   const userId = mongoose.Type.ObjectId(req.user._id);
//   console.log(userId);
//   console.log({user:req.user._id.toString()});
   if(!req.user){
    return next(new ErrorHandler("user not found",404))
   }
//    console.log(req.user.avatar.role);
   next();
})   
exports.authorizeRoles = (...roles)=>{
 return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        
        return next(
            new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce`,403)
        )
    }
    next();
 }
}