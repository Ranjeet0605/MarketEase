
const mongoose = require("mongoose");

const connectmongodb = async() => {
  try{
    await mongoose.connect(process.env.DB_URI, {
       
    })
    
      console.log("Connected to MongoDB");
    }

    catch(error){
     console.error("Error connecting to MongoDB:", error.message);
    };
      
}
module.exports = connectmongodb;
