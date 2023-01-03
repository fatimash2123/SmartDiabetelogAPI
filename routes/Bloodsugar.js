const express=require("express");
const router=express.Router();
const Bloodsugar=require("../models/Bloodsugar")
const requireToken=require("../middlewares/requireToken");

// view a particular blood sugar instance using its id
router.get('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findById({_id:id});
        res.json( bs)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// view all blood sugar instances of the day
router.get('/:date',requireToken,async (req,res)=>{
    try{
        const date=req.params.date;
        console.log(date)
        const bs= await Bloodsugar.find({"creationDate":date});
        res.setHeader("Content-Type","application/json")
        res.json( bs)
    }
    catch(err){
       
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// add new blood sugar instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const {concentration,unit,description,date,event,creationDate,creationTime}=req.body;
        const user_id=req.user._id;
        const bs=new Bloodsugar({concentration,unit,description,date,event,creationDate,creationTime,user_id});
        bs.save()
    res.json({"status":"Stored Successfully"})
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }
    
})

// update a particular blood sugar instance using its id
router.patch('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated"})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular blood sugar instance using its id
router.delete('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bs= await Bloodsugar.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted"})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;