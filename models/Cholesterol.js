const mongoose=require("mongoose");

const CholesterolSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    ldl:{
        type:Number,
     
    },
    hdl:{
        type:Number,
   
    },
    triglycerides:{
        type:Number,
   
    },
    description:{
        type:String,
    },
    user_id:{
        type:Object,
        ref:'User'
    }

},{timestamps:true})

module.exports=mongoose.model("Cholesterol",CholesterolSchema);