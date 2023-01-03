const mongoose=require("mongoose");
const OTPSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    code:{
        type:String,
        required:true
    },
    user_id:{
        type:Object,
        ref:'User'
    }
},{timestamps:true})
module.exports=mongoose.model("OTP",OTPSchema);