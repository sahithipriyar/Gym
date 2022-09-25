const mongoose=require("mongoose")
const weighModal=new mongoose.Schema({
    Weigh_Lifiting:{
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
const weighSchema=mongoose.model("weigh_lifting",weighModal)
module.exports=weighSchema