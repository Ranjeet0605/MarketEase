// const CastError = require('some-module');
const {ErrorHandler} = require("../utils/errorhandling");
module.exports = (err, req, res, next)=>{
     err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";
    //Wrong Mongodb Id error
    if(err.name === 'CastError'){
      const message = `Resource not found with ID:${err.value}`;
   
      const customError =  new ErrorHandler(message, 404);
      return next(customError)
   }
   // Mongoose duplicate key error 
   if(err.code === 11000){
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message,  400);
   }
   // Wrong JWT error
    if(err.name==="jsonWebTokenError"){
      const message = `json Web Token is invalid , try again`;
      err= new ErrorHandler(message, 400);
    }
    //jwt EXPIRE error 
    if(err.name==="TokenExpireError"){
       const message = `json Web Token is Expired, Try again`;
       err = new ErrorHandler(message, 400);
    }
 res.status(err.statusCode).json({
    success:false,
    message: err.message,
 });
}