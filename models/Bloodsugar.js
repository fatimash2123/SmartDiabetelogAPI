const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const BloodsugarSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    concentration:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        enum:["mmol/L" , "mg/dL"],
        default:'mmol/L',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date
    },
    creationDate:{
        type:String,
    },
    creationTime:{
        type:String,
    },
    event:{
        type: String,
        enum : ['Before Breakfast','After Breakfast','Before Lunch','After Lunch',
        'Before Dinner','After Dinner','Before Exercise','After Exercise', 'Random'],
        default:'Random'
    },
    user_id:{
        type:Object,
        ref:'User'
    }

},{timestamps:true})



module.exports=mongoose.model("Bloodsugar",BloodsugarSchema);