const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})
const usermodal=mongoose.model("users",userSchema)
module.exports=usermodal