const express=require("express");
const router=express.Router();
const LongInsulin=require("../models/Longinsulin")
const requireToken=require("../middlewares/requireToken");

// view all long insulin instances
router.get('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        user_id=req.user._id;
        const c= await LongInsulin.find({"user_id":user_id,"prescription_id":id});
        res.json(c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// add new long insulin  instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const { name,units,time,prescription_id}=req.body;
        const user_id=req.user._id;
        const c=new LongInsulin({name,units,time,user_id,prescription_id});
        await c.save()
        res.json({"status":"Stored Successfully",c})
   
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }
    
    
})

// update a particular long insulin  instance using its id
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await LongInsulin.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular long insulin  instance using its id
router.delete('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await LongInsulin.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;