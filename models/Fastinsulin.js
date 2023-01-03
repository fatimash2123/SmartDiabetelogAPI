const mongoose=require("mongoose");
const FastInsulinSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    isf:{
        type:Number,
        required:true
    },
    carb_ratio:{
        type:Number,
        required:true
    },
    user_id:{
        type:Object,
        ref:'User'
    }
},{timestamps:true})
module.exports=mongoose.model("Fastinsulin",FastInsulinSchema);