const mongoose=require("mongoose");

const BloodpressureSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    disystolic:{
        type:Number,
        required:true
    },
    systolic:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:Object,
        ref:'User'
    }

},{timestamps:true})

module.exports=mongoose.model("Bloodpressure",BloodpressureSchema);