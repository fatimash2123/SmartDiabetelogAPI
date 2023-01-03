const express=require("express");
const router=express.Router();
const User=require("../models/User");
const {jwtkey}=require("../keys")
const jwt=require("jsonwebtoken");
const requireToken=require("../middlewares/requireToken");


router.post('/register',async (req,res)=>{
    console.log(req.body);
    const {name,email,password}=req.body;
    try{
    const user=new User({name,email,password});
    await user.save();
    //generate token
    const token= jwt.sign({userId:user._id},jwtkey)
    res.status(200).send({token}); 
    }
    catch(err){
        if(err.code==11000){
            res.send({"error":"Email is already registered"})
        }
        else{
        //422 means you did something unvalid
        res.status(422).send(err.message)
        }
    }
})

router.post("/login",async (req,res,next)=>{
    //if user did not provide email or password
    const {email,password}=req.body;
    if(!email || !password){
        console.log(1)
        return res.status(404).send({"error":"Must provide email or password"});
    }

    //Find the user from database
    const user=await User.findOne({email});
    //if user not found
    if(!user){
        console.log(2)
        return res.status(404).send({"error":"User not Found"});
    }
    //if user found
    try{
        await user.comparePassword(password);
        console.log(req.body)
        const token= jwt.sign({userId:user._id},jwtkey)
    
        
        res.setHeader("Content-Type","application/json")
        const a=JSON.stringify({"token":token})
         return res.json({token});
    }
    catch(err){
        console.log(3)
         res.status(404).send({"error":"User Not Found "});
    }
})


//edit profile information
// update a particular prescription title,fast_insulin, long_insulin
router.patch('/',requireToken,async (req,res)=>{
    try{
        const accountInfo= await User.findByIdAndUpdate({_id:req.user._id},req.body);
        res.json({"status":"Successfully Updated",accountInfo})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

router.delete('/',requireToken,async (req,res)=>{
    try{
        const accountInfo= await User.findByIdAndDelete({_id:req.user._id});
        res.json({"status":"Successfully Delete",accountInfo})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


module.exports=router;