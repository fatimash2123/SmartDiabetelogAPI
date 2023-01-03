const mongoose=require("mongoose");

const CholesterolSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    cholesterol:{
        type:Number,
        required:true
    },
    ldl:{
        type:Number,
        required:true
    },
    hdl:{
        type:Number,
        required:true
    },
    triglycerides:{
        type:Number,
        required:true
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