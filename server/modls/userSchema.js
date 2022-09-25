const mongoose = require("mongoose")
const userModal = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    userType:{
        type:String,
        require:true
    }

})
const userSchema=mongoose.model("user",userModal)
module.exports=userSchema
