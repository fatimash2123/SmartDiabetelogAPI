const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const { jwtkey } = require("../keys")
const jwt = require("jsonwebtoken");

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
    },
    userVerified:{
        type:Boolean,
        default:false
    },
    state:{type:Object},
    tokens:[{"token":{type:String}}],
    activityLevel:{
        type: String,
        enum : ['Very Light','Light','Moderate','Heavy',
        'Very Heavy'],
        default:'Light'
    },
    gender:{
        type: String,
        enum : ['Male',"Female"],
        default:'Male'
    },

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

//generation the token 
UserSchema.methods.generateAuthToken=async function(){
    try{
       // const token = jwt.sign({ userId: user._id }, jwtkey)
        let token=jwt.sign({userId:this._id},jwtkey);
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }
    catch(err){
        console.log(err)
    }
}

module.exports=mongoose.model("User",UserSchema);