const catchAsyncError = require("../middleware/catchAsyncError");
const userSchema = require("../models/usermodel");
const { ErrorHandler } = require("../utils/errorhandling");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendmail")
const crypto = require("crypto")
const cloudinary =  require("cloudinary");
// register the new users 
exports.register = catchAsyncError(async(req,res,next)=>{
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop:"scale",
  })
    const {name, email, password} = req.body;
    const users = await userSchema.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        },
    })
    sendToken(users,200,res);
   

})
// login the users 
exports.loginuser = catchAsyncError(async(req,res,next)=>{
    const {email, password} = req.body;
    // checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    console.log(password);
    const user = await userSchema.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email and password"),401);

    }
    const ispasswordMatched =  await user.comparePassword(password);
    if(!ispasswordMatched){
return next(new ErrorHandler("invalid email and password"),401);
    } 
    sendToken(user,200,res);
})
//logout user
exports.logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
      expires:  new Date(Date.now()),   
        httpOnly: true
    })
    res.status(200).json({
        success: true, 
        message:"Logged out"
    })
})
// forgot password
exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await userSchema.findOne({email: req.body.email});

  if(!user){
    return next(new ErrorHandler("User not found",404))
  }
  console.log(user);
  // get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
       const resetoken = resetToken.resetpasswordToken
  console.log(resetoken);
  await user.save({validateBeforeSave:false})
  const resetPasswordUrl  = `${req.protocol}://${req.get("host")}/password/reset/${resetoken}`
const message = `Your password reset token is :-\n\n ${resetPasswordUrl}\n\nIf you have not requested this email then, please ignore it`;
try {
 await sendEmail({
    email: user.email,
    subject:`Ecommerce Password Recovery`,
    message:message
 });
 res.status(200).json({
    success: true,
    message:`Email sent to ${user.email} successfully`,
 })
}catch(error){
    user.resetpasswordToken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save({validateBeforeSave: false});
    return next(new ErrorHandler(error.message,500));
}
})


// Reset Password
exports.resetPassword = catchAsyncError(async(req,res,next)=>{
    // creating token hash
  if(!req.params.resettoken){
    return next(new ErrorHandler("Reset token is missing ",400));
  }
console.log(req.params.resettoken);
// const resetPasswordToken = crypto.createHash("sha256").update(req.params.resettoken).digest("hex")
// console.log(resetPasswordToken)
const resetPasswordToken = req.params.resettoken;
const user = await userSchema.findOne({resetpasswordToken:resetPasswordToken,resetpasswordexpire:
  {
  $gt: Date.now(),
},})
console.log(user);
if(!user){
  return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
}


    
if(req.body.password !== req.body.confirmPassword){
  console.log(req.body.password );
  console.log(req.body.confirmpassword);
  return next(new ErrorHandler("password does not match please enter password reagain", 400));
}
  user.password = req.body.password;
  user.resetpasswordToken = undefined;
  user.resetpasswordexpire = undefined;
  await user.save();
  sendToken(user,200, res)
}) 

// get User Details 
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
 const user = await userSchema.findById(req.user.id);
 res.status(200).json({
    success:true, 
    user,
 });
});

//update User password
exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    if (!req.user || !req.user.id) {
        return next(new ErrorHandler("User not authenticated", 401));
    }    
    const user = await userSchema.findById(req.user.id).select("+password");
    const ispasswordMatched = await user.comparePassword(req.body.oldPassword);
    if(!ispasswordMatched){
        return next(new ErrorHandler("old password is incorrect", 400));
    }
    if(req.body.newPassword!=req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }
    user.password = req.body.newPassword; 
   await user.save()

    sendToken(user,200,res); 
})
//update user profiles
exports.updateprofile = catchAsyncError(async(req,res,next)=>{
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
  }
  console.log(req.user.id);
  // We will add cloudinary later
  if(req.body.avatar!==""){
    const user =  await userSchema.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop:"scale",
    });
    newUserdata.avatar={
      public_id:myCloud.public_id,
      url:myCloud.secure_url,
    }
  }
  const user = await userSchema.findByIdAndUpdate(req.user.id,newUserdata,{
    new: true,
    runValidators: true,
    userFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
})

// Get all user(admin)
exports.getAlluser = catchAsyncError(async(req,res,next)=>{
  console.log("my name ranjeet kumar pr")
const users = await userSchema.find();
console.log(users);
res.status(200).json({
  success: true,
  users,
})
})

//  get single user (admin)
exports.getSingleuser = catchAsyncError(async(req, res,next)=>{
  console.log("my name is ranjeet")
  console.log(req.params._id);
     const user = await userSchema.findById(req.params.id);
     if(!user){
      return next(new ErrorHandler(`user does not exist with Id: ${req.params.id}`))
     };
     res.status(200).json({
      success: true,
      user,
     });
});
// update  user 
exports.updateroles = catchAsyncError(async(req,res,next)=>{
  const newUserdata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  }
  console.log(req.user.id);
  const user = await userSchema.findByIdAndUpdate(req.params.id,newUserdata,{
    new: true,
    runValidators: true,
    userFindAndModify:false,
  })
  res.status(200).json({
    success:true,
  })
})
// delete user -- admin
exports.deleteuser = catchAsyncError(async(req,res,next)=>{
  const user = await userSchema.findById(req.params.id);
  if(!user){
   return next(new ErrorHandler(`user does not exist with Id: ${req.params.id}`))
  };
   const imageId = user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(imageId);
  await userSchema.deleteOne({_id:req.params.id})
  res.status(200).json({
    success:true,
    message:"user deleted successfully!"
  })
})
