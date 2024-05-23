const express = require("express");
const cookieParser = require("cookie-parser");
const path= require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/.env"});
    }
 const app = express();
 app.use(express.json());
 app.use(cookieParser())

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(fileUpload());
// Router
const productrouter = require("./router/productrouter");
const userrouter = require("./router/userrouter");
const orderrouter = require("./router/orderrouter");

const paymentRouter = require("./router/paymentRouter");
const errorMiddleware = require("./middleware/error");
app.use("/api/v1",productrouter);
app.use("/api/v1",userrouter);
app.use("/api/v1",orderrouter);
app.use("/api/v1",paymentRouter);

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/build","index.html"))
})
// middleware for errors
app.use(errorMiddleware);
module.exports = app;
