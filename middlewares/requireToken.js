const jwt=require("jsonwebtoken");
const User=require("../models/User");
const data=require("../keys");



//to check if the request has the token or not
// every request ppasses through this to go to any protected resource
module.exports=(req,res,next)=>{

    //get authorization key which contains token from the request in header
    const {authorization}=req.headers;
    //if authorization has no token 
    if(!authorization){
        //401 status means forbidden
        console.log("request received")
        return res.status(401).send({error:"You must be logged in 1!"});
    }

    //if the authorization has token
    //authorization token has format Bearer ......token......., Now remove this Bearer
    const token=authorization.replace("Bearer ","");

    //Now verify sending token matches the jwtKey and has the user_id linked or not
    jwt.verify(token,data.jwtkey, async (err,result)=>{
        if(err){
            return res.status(401).send({"error":"You must be logged in 2!"});
        }
        else{
            console.log("finding user")
            console.log(res.userId)
        const {userId}=result;
        const user=await User.findById({"_id":userId});
        console.log("user found is",user._id)
        //to access user everytime
        req.user=user;
        next()}
    })

}