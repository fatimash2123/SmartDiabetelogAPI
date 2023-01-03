const mongoose=require("mongoose");
const PrescriptionSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        default:"New Prescription"
    },
    oral_medication:{type: [{o_id:
        {
            type:"ObjectId",
            ref:"Oralmedication"
        }
    }]},
    long_insulin:{
        type:"ObjectId",
        ref:"Longinsulin"
    },
    fast_insulin:{
        type:"ObjectId",
        ref:"Fastinsulin"
    }
},{timestamps:true})
module.exports=mongoose.model("Prescription",PrescriptionSchema);