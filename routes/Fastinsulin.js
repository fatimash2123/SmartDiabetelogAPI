const express=require("express");
const router=express.Router();
const FastInsulin=require("../models/Fastinsulin")
const requireToken=require("../middlewares/requireToken");

// view a particular fast insulin instance using its id
router.get('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const user_id=req.user._id;
        const c= await FastInsulin.find({"user_id":user_id,"prescription_id":id});
        res.json(c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// add new fast insulin  instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const { name,isf,carb_ratio,prescription_id}=req.body;
        const user_id=req.user._id;
        const c=new FastInsulin({name,isf,carb_ratio,user_id,prescription_id});
        await c.save()
        res.json({"status":"Stored Successfully",c})
   
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }
    
    
})

// update a particular fast insulin  instance using its id
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await FastInsulin.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular fast insulin  instance using its id
router.delete('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await FastInsulin.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;