const mongoose=require("mongoose");

const OralMedicationSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    dosage:{
        type:Number,
        required:true
    },
    unit:{
        type:String,
        default:"20",
        required:true
    },
    time:{type: String},
    user_id:{
        type:Object,
        ref:'User'
    },
    type:{
        type: String,
        enum : ['diabetic',"nondiabetic"],
        default:'nondiabetic'
    },

},{timestamps:true})

module.exports=mongoose.model("Oralmedication",OralMedicationSchema);