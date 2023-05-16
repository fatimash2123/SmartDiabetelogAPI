const express=require("express");
const router=express.Router();
const OTP=require("../models/OTP");
const requireToken=require("../middlewares/requireToken");
var nodemailer = require("nodemailer");

const generateOTP=async(id)=>{
    let otp="";
    for(let i=0; i<4; i++){
        let num=Math.round(Math.random()*9,0)
        otp+=(num.toString())
    }
    
    const o=new OTP({"code":otp,id});
    await o.save()
    return (otp);
}
// send an email  
router.get('/sendemail',requireToken,async (req,res)=>{
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            //securesally@gmail.com
          user: 'fshahzad2123@gmail.com',
          //oernwtexlvpcakni
          pass:"pbbtnjwsguqktkbz"
          // 'HardworkIsLife.'
        },
        port:465,
        host:'securesally@gmail.com'
      });
      
      const otpValue=await generateOTP(req.user._id);
      var mailOptions = {
        from: 'fshahzad2123@gmail.com',
        to: req.user.email,
    
        subject: 'Email from SmartDiabetelog',
        text: `OTP is ${otpValue}!!`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.send({error})
        } else {
          console.log('Email sent: ' + info.response);
          res.send({"status":"email successfully send","code":otpValue})
        }
      });

})

router.get('/getotp',requireToken,async (req,res)=>{
    try{
        const c= await OTP.findById({user_id:req.user._id},{"code":1,_id:0});
        res.json({"code":c.code})
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

router.get('/deleteotp',requireToken,async (req,res)=>{
    try{
        const c= await OTP.findByIdAndDelete({user_id:req.user.id});
        res.json("otp deleted after being expired")
    }
    catch(err){
        res.json({"error":"Connection Failed! Try Again"})
    }
})

module.exports=router