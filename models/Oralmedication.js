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
        default:"mg",
        required:true
    },
    time:[{type: String}],
    user_id:{
        type:Object,
        ref:'User'
    }

},{timestamps:true})

module.exports=mongoose.model("Oralmedication",OralMedicationSchema);