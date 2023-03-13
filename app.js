const express=require("express");
const app=express();
const requireToken=require("./middlewares/requireToken");
const PORT=3000;
const bodyParser=require("body-parser")
const http=require("http")
//const newHostname = '192.168.170.35'; // New IP address
// const cors=require("cors")
// app.use(cors({
//     origin: 'http://192.168.170.35/:3000',
//     methods: ['GET', 'POST'],
//     headers: ['Content-Type'],
//     credentials: true
//   }));

app.use(bodyParser.json());
const {mongoURL}=require("./keys")
const mongoose=require("mongoose")
mongoose.set('strictQuery', true)


//connection to database
mongoose.connect(mongoURL,(error)=>{
    if(error){
        console.log("Connection to db failed")
    }
    else{
    console.log("Connection to db successful")
    }
})

//check the token and declare user
app.get('/',requireToken,(req,res)=>{
    res.send("your email is "+req.user.password)
})

//routes routers
const authenticationRouter=require("./routes/authentication");
const bloodSugarRouter=require("./routes/Bloodsugar");
const bloodPressureRouter=require("./routes/Bloodpressure");
const cholesterolRouter=require("./routes/Cholesterol");
const OralMedicationRouter=require("./routes/Oralmedication");
const FastInsulinRouter=require("./routes/Fastinsulin");
const LongInsulinRouter=require("./routes/Longinsulin");
const AllergicReactionRouter=require("./routes/Allergisreaction");
const PrescriptionRouter=require("./routes/Prescription");
const OtpRouter=require("./routes/OTPGenerator");
//routes middlewares
app.use(authenticationRouter);
app.use("/bloodsugar",bloodSugarRouter);
app.use("/bloodpressure",bloodPressureRouter);
app.use("/cholesterol",cholesterolRouter);
app.use("/oralmedication",OralMedicationRouter);
app.use("/fastinsulin",FastInsulinRouter);
app.use("/longinsulin",LongInsulinRouter);
app.use("/allergicreaction",AllergicReactionRouter);
app.use("/prescription",PrescriptionRouter);
app.use("/otp",OtpRouter);



app.listen(PORT,()=>{
    console.log("Server Running at "+PORT);
});

module.exports=app;