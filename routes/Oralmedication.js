const express=require("express");
const router=express.Router();
const Oralmedication=require("../models/Oralmedication")
const requireToken=require("../middlewares/requireToken");

// view a particular Oral Medication instance using its id
router.get('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const c= await Oralmedication.findById({_id:id});
        res.json( c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// add new Oral Medication instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const { name,dosage,time}=req.body;
        const user_id=req.user._id;
        const c=new Oralmedication({name,dosage,time,user_id});
        c.save()
        res.json({"status":"Stored Successfully"})
   
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }
    
    
})

// update a particular Oral medicatiom instance using its id
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Oralmedication.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated"})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular oral medication instance using its id
router.delete('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Oralmedication.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted"})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;