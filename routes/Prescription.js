const express=require("express");
const router=express.Router();
const Prescription=require("../models/Prescription")
const requireToken=require("../middlewares/requireToken");



// view all prescriptions 
router.get('/',requireToken,async (req,res)=>{
    try{
        const prescription= await Prescription.find({});
        res.json(prescription)
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})


// add a new  prescription instance
router.post('/',requireToken,async(req,res)=>{
    try{
        const {title,oral_medication,long_insulin,fast_insulin,createdAt}=req.body;
        const user_id=req.user._id;
        const prescription=new Prescription({title,oral_medication,long_insulin,fast_insulin,createdAt,user_id});
        await prescription.save()
        res.json({"status":"Stored Successfully",prescription})
    }
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    }  
})

// update a particular prescription title,fast_insulin, long_insulin
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const prescription= await Prescription.findByIdAndUpdate({_id:id},req.body);
        res.json({"status":"Successfully Updated",prescription})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

// delete a particular prescription
router.delete('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const prescription= await Prescription.findByIdAndDelete({_id:id},req.body);
        res.json({"status":"Successfully Deleted",prescription})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

//Add a oral medication into a particular prescription
router.patch('/addoral/:p_id' ,async function(req,res,next){
    try{
    const p_id=req.params.p_id;
    const {o_id}=req.body;

    //add the oral medication id in the prescription 
    const result=await Prescription.findByIdAndUpdate({"_id":p_id},{$push:{"oral_medication":{"o_id":o_id}}})
    res.json({"status":"Added Successfully",result})   
}
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    } 
});

//Remove a oral medication from a particular prescription
router.patch('/removeoral/:p_id' ,async function(req,res,next){
    try{
    const p_id=req.params.p_id;
    const {o_id}=req.body;
    console.log(o_id);
    console.log(p_id);

    //add the oral medication id in the prescription 
    const result=await Prescription.findOneAndUpdate({"_id":p_id},{$pull:{"oral_medication":{"o_id":o_id}}})
    res.json({"status":"Removed Successfully",result})   
}
    catch(err){
        res.json({"error":"Not Stored! Try Again"})
    } 
});



module.exports=router;