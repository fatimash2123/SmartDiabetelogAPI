const mongoose=require("mongoose");

const BloodpressureSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    disystolic:{
        type:Number,
      
    },
    systolic:{
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

module.exports=mongoose.model("Bloodpressure",BloodpressureSchema);