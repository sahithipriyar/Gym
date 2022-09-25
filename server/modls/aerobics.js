const mongoose=require("mongoose")
const AerobicsModal=new mongoose.Schema({
    Aerobics:{
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
const AerobicSchema=mongoose.model("list",AerobicsModal)
module.exports=AerobicSchema