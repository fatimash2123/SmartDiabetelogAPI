const mongoose=require("mongoose");
const AllergicReactionSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    type:{
        type: String,
        enum : ['food','medication'],
        required:true
    },
    symptoms:[{
        type:String,
    }],
    description:{
        type:String,
    }
},{timestamps:true})
module.exports=mongoose.model("Allergicreaction",AllergicReactionSchema);