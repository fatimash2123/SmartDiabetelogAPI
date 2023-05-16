const express=require("express");
const router=express.Router();
const Bloodpressure=require("../models/Bloodpressure")
const requireToken=require("../middlewares/requireToken");

// view a particular blood pressure instance using its id
router.get('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Bloodpressure.findById({_id:id});
        res.status(200).json( bp)
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// view all blood pressure instances of the week
router.get('/:sdate/:edate',requireToken,async (req,res)=>{
    try{
        const sdate=req.params.sdate;
        const edate=req.params.edate;
        console.log(sdate)
        console.log(edate)
        let bs= await Bloodpressure.find({
            user_id:req.user._id,
            createdAt: { $gte: sdate, $lte: edate }});
            console.log("L")
        res.status(200).json(bs)
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// add new blood pressure instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const {disystolic,systolic,description,createdAt}=req.body;
        const user_id=req.user._id;
        const bp=new Bloodpressure({disystolic,systolic,description,createdAt,user_id});
        bp.save()
    res.status(200).json(bp)
    }
    catch(err){
        res.status(500).json({"error":"Not Stored! Try Again"})
    }
    
})

// update a particular blood pressure instance using its id
router.patch('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Bloodpressure.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json({"status":"Successfully Updated"})
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular blood pressure instance using its id
router.delete('/instance/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const bp= await Bloodpressure.findByIdAndDelete({_id:id},req.body);
        res.status(200).json({"status":"Successfully Deleted"})
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router;