const express=require("express");
const router=express.Router();
const Bloodsugar=require("../models/Bloodsugar")
const requireToken=require("../middlewares/requireToken");

// view a particular blood sugar instance using its id
router.get('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findById({_id:id});
        console.log(bs)
        res.status(200).json( bs)
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// view all blood sugar instances of the day
router.get('/:date',requireToken,async (req,res)=>{
    try{
        const user_id=req.user._id;
        const date=req.params.date;
        console.log(date)
        const bs= await Bloodsugar.find({user_id:user_id,creationDate:date});
        res.setHeader("Content-Type","application/json")
        console.log(bs)
        res.status(200).json(bs)
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// add new blood sugar instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const {concentration,unit,description,date,event,creationDate,creationTime}=req.body;
        console.log(req.body)
        const user_id=req.user._id;
        const bs=new Bloodsugar({concentration,unit,description,date,event,creationDate,creationTime,user_id});
        bs.save()
    res.status(201).json(bs)
    }
    catch(err){
        res.status(500).json({"error":"Not Stored! Try Again"})
    }
    
})

// update a particular blood sugar instance using its id
router.patch('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json({"status":"Successfully Updated"})
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular blood sugar instance using its id
router.delete('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findByIdAndDelete({_id:id},req.body);
        res.status(200).json({"status":"Successfully Deleted"})
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;