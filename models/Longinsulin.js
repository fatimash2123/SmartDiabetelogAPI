const mongoose=require("mongoose");
const LongInsulinSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    units:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        default:"22:00"
    },
    user_id:{
        type:Object,
        ref:'User'
    },
    prescription_id:{
        type:Object,
        ref:'Prescription'
    }
},{timestamps:true})
module.exports=mongoose.model("Longinsulin",LongInsulinSchema);