const mongoose=require("mongoose")
const cardioModal=new mongoose.Schema({
    cardio:{
        type:String,
    },
    slot:{
        type:Number
    },
    trainer:{
        type:String
    },
    bookedSlot:{
        type:String
    }
})
const cardioSchema=mongoose.model("cardio",cardioModal)
module.exports=cardioSchema