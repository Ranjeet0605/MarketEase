const app = require("./app")


const cloudinary = require("cloudinary");
const  connectmongodb = require("./config/database")
// handling uncought exception error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({path:"backend/config/.env"});
}
// connect data base
connectmongodb();
//use cloudinary for upload data
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const port = process.env.PORT || 6000 ;
const server = app.listen(port,()=>{
    console.log(`server is working port on http://localhost:${process.env.PORT}`)
})

// unhandled promise Rejection 

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down server due to undhandled promise rejections`);
    server.close(()=>{
        process.exit(1);
    })
})
