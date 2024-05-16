const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
  const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Enter the name"],
        maxLength:[30, "Your name should not more than 30 char."],
        minLength:[4, "Your name should not less than 4 char"],
    },
    email:{
        type:String,
        required:[true, "Enter the email"],
        unique: true,
        validate:[validator.isEmail, "Enter your validate email"],
    },
    password:{
        type:String,
        required: [true, "Eter your password"],
        minLength:[8,"password should have more than 8 characters."],
        select: false,
    },
    avatar:{
        public_id:{
            type:String,
        required: true,
        },
        url:{
            type:String,
            required:true,
        },
      
},
resetpasswordToken: String,
resetpasswordexpire:Date,
role:{
    type:String,
    default: "user",
},

createdAt:{ 
type:Date,
default:Date.now,
},

})
    userSchema.pre("save", async function(next){
        if(!this.isModified("password")){
            next()
        }
        this.password = await bcrypt.hash(this.password,10)
    })
//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};
    // compare password
    userSchema.methods.comparePassword = async function(enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password);
    }

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // generating token
     const resettoken = crypto.randomBytes(20).toString("hex");
       this.resetpasswordToken = crypto.createHash("sha256").update(resettoken).digest("hex");
      this.resetpasswordexpire = Date.now() + 15*60*1000;
    
      return{ 
    resetpasswordToken: this.resetpasswordToken,
    // resetpasswordexpire : this.resetpasswordexpire,
    }
    }
  module.exports = mongoose.model("User",userSchema)