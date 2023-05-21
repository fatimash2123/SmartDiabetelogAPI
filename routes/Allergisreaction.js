const express=require("express");
const router=express.Router();
const requireToken=require("../middlewares/requireToken");
const Allergicreaction = require("../models/Allergicreaction");

// view all allergic reactions 
router.get('/all',requireToken,async (req,res)=>{
    try{
        const c= await Allergicreaction.find({});
        res.json(c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// view all allergic reactions of given type
router.get('/type/:type',requireToken,async (req,res)=>{
    try{
        const type=req.params.type;
        const user_id=req.user._id;
        const c= await Allergicreaction.find({type,user_id});
        res.json(c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// view a particular allergic reaction instance using its id
router.get('/:id',requireToken,async (req,res)=>{
    try{
        
        const id=req.params.id;
        const c= await Allergicreaction.findById({_id:id});
        res.json(c)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// add new allergic reaction instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const { name,type,symptoms,description,active_agent}=req.body;
        const user_id=req.user._id;
        const c=new Allergicreaction({name,type,symptoms,description,user_id,active_agent});
        await c.save()
        res.json({"status":"Stored Successfully",c})
   
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }
    
    
})

// update a particular allergic reaction instance using its id
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Allergicreaction.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular allergic reaction instance using its id
router.delete('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Allergicreaction.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted",bp})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;