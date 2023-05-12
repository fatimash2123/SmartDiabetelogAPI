const express=require("express");
const router=express.Router();
const requireToken=require("../middlewares/requireToken");
const Dashboard = require("../models/Dashboard");

// add new question
router.post('/',requireToken,async(req,res)=>{
    try{
        const { title,detail}=req.body;
        const userAsked=req.user._id;
        const question=new Dashboard({title,detail,userAsked});
        await question.save()
        res.status(200).json({"status":"Stored Successfully",question})
    }
    catch(err){
        res.status(500).json({"error":"Not Stored! Try Again"})
    }   
})

// view all asked questions 
router.get('/',requireToken,async (req,res)=>{
    try{
        const questions= await Dashboard.find({});
        res.status(200).json(questions)
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// view particular question details asked questions 
router.get('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id
        const question= await Dashboard.find({"_id":id});
        res.status(200).json(question[0])
    }
    catch(err){
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})

// add an answer to a question
router.patch('/:id',requireToken,async (req,res)=>{
    try{
        const id=req.params.id;
        const user_id=req.user.id
        const {answer}=req.body
        const question=await Dashboard.find({"_id":id});
        console.log("here 1")

        const result= await Dashboard.findByIdAndUpdate({_id:id},
            //{answers:[...question,{"user_id": user_id,"answer":answer }]},
            {$push: {answers: {user_id: user_id, answer: answer}}} ,
            {new:true}
            );
        console.log("here 2")
        res.status(200).json({"status":"Successfully Updated",result})
    }
    catch(err){
        console.log(err)
        res.status(500).json({"error":"Connection Failed! Try Again"})
    }
})





module.exports=router;