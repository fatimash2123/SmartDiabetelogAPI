const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const UserSchema=new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    weight:{
        type:Number,
    },
    heightFeet:{
        type:Number
    },
    heightInches:{
        type:Number
    },
    diabetesType:{
        type: String,
        enum : ['Type 1','Type 2'],
    },
    profilePicture:{
        type:String
    }

})

//hashing the password before saving
UserSchema.pre('save',function(next){
    const user=this;
    //if password not modified that means its already hashed
    if(!user.isModified("password")){
        return next();
    }

    //else if its modified then
    //generate salt for hasing
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
        //hash the password
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err){
                return next(err)
            }
            user.password=hash;
            next();
        })
    })
})


//comparing the password
UserSchema.methods.comparePassword=function(candidatePAssword){
    const user=this;
    //compare candidatePassword with with this user password
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePAssword,user.password,(err,isPasswordMatched)=>{
            
            if(err){    
                return reject(err);
            }
            if(!isPasswordMatched){
                return reject(err);
            }  
            return resolve(true)   
        })
    })  
}

module.exports=mongoose.model("User",UserSchema);