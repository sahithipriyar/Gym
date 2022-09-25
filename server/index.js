const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const userSchema = require("./modls/userSchema")
const doten=require("dotenv").config()
const cors=require("cors")
const AerobicsSchema=require("./modls/aerobics")
const weighSchema=require("./modls/weighSwchma")
const cardioSchema=require("./modls/cardioSchema")
const app=express()
const salt=10
app.listen(process.env.PORT || 3002,(err)=>{
    if(!err){
        console.log("Server connected on port 3002 successfully");
    }else{
        console.log(err);
    }
})
mongoose.connect("mongodb+srv://sahithi:priya@credochain.ptf0xaz.mongodb.net/?retryWrites=true&w=majority",(err)=>{
    if(!err){
        console.log("Database connected");
   }else{
        console.log(err);
    }
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.post("/signup",(req,res)=>{
    console.log(req.body)
    let passwords=req.body.signupState.password
    bcrypt.genSalt(salt).then((hashsalt)=>{
        bcrypt.hash(passwords,hashsalt).then((hashpassword)=>{
            userSchema.create({
                name:req.body.signupState.name,
                mobileNumber:req.body.signupState.mobileNumber,
                address:req.body.signupState.address,
                age:req.body.signupState.age,
                username:req.body.signupState.username,
                password:hashpassword,
                userType:req.body.signupState.userType
            }).then((data)=>{
                res.status(200).send(`${data} Created Successfully`)
            }).catch((err)=>{
                res.status(400).send(err)
            })
        })
    })
   
})
app.post("/login",(req,res)=>{
    console.log(req.body)
    userSchema.find({username:req.body.username}).then((data)=>{
        console.log(data)
        if(data.length){
            bcrypt.compare(req.body.password,data[0].password).then((user)=>{
                if(user){
                    const authoToken=jwt.sign(data[0].username,process.env.SECRET_KEY)
                    console.log(authoToken);
                    res.status(200).send({authoToken})
                }else{
                    res.status(400).send("Incorrect Password")
                }
            })
        }else{
            res.status(400).send("User not find")
        }
    })
})
app.get("/details",(req,res)=>{
    const username=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
    userSchema.find({username:username}).then((data)=>{
        res.status(200).send(data[0])
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
app.get("/trainer",(req,res)=>{
    userSchema.find({}).then((data)=>{
                res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
app.post("/Aerobics",(req,res)=>{
    console.log(req.body);
   const username=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
   userSchema.find({username:username}).then((data)=>{
    if(data.length){
        AerobicsSchema.create({
            Aerobics:req.body.Aerobics,
            slot:req.body.remAero,
            bookedSlot:req.body.aero
        }).then((data)=>{
            res.status(200).send(data)
        }).catch((err)=>{
            res.status(400).send(err)
        })
    }
   })
})
app.get("/Aerobics",(req,res)=>{
    AerobicsSchema.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
app.post("/weigh",(req,res)=>{
    console.log(req.body)
    const username=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
    userSchema.find({username:username}).then((data)=>{
     if(data.length){
         weighSchema.create({
             Weigh:"Weigh_Lifting",
             slot:req.body.remWeigh,
             trainer:req.body.trainer,
             bookedSlot:req.body.weigh
         }).then((data)=>{
             res.status(200).send(data)
         }).catch((err)=>{
             res.status(400).send(err)
         })
     }
    })
 })
 app.get("/weigh",(req,res)=>{
    weighSchema.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})
app.post("/cardio",(req,res)=>{
    
    const username=jwt.verify(req.headers.authorization,process.env.SECRET_KEY)
    userSchema.find({username:username}).then((data)=>{
     if(data.length){
         cardioSchema.create({
             cardio:"Cardio",
             slot:req.body.remCardi,
             trainer:req.body.trainer,
             bookedSlot:req.body.Cardi
         }).then((data)=>{
             res.status(200).send(data)
         }).catch((err)=>{
             res.status(400).send(err)
         })
     }
    })
 })
 app.get("/cardio",(req,res)=>{
    cardioSchema.find({}).then((data)=>{
        res.status(200).send(data)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})