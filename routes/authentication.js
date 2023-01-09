const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { jwtkey } = require("../keys")
const jwt = require("jsonwebtoken");
const requireToken = require("../middlewares/requireToken");


router.post('/register', async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        console.log("here")
        // //generate token
        const token=await user.generateAuthToken();
        console.log(token)
         res.status(200).json({ "status":"registeration in process","token":token });
    }
    catch (err) {
        if (err.code == 11000) {
            res.status(422).json({ "error": "Email is already registered" })
        }
        else {
            console.log(err.message)
            res.status(500).json({ "error": "Something went Wrong! Try Again" })
        }
    }
})

router.post("/login", async (req, res, next) => {
    //if user did not provide email or password
    const { email, password } = req.body;
    if (!email || !password) {
        console.log(1)
        return res.status(404).send({ "error": "Wrong email or password" });
    }

    //Find the user from database
    const user = await User.findOne({ email });
    //if user not found
    if (!user) {
        console.log(2)
        return res.status(404).send({ "error": "Wrong email or password" });
    }
    //if user found
    try {

        if (user.userVerified === false) {
            console.log("user not verified by otp")
            return res.status(404).send({ "error": "Wrong email or password" });
        }

         //match password
         await user.comparePassword(password);
         console.log(req.body)
         //generate token
         const token=await user.generateAuthToken();
         console.log(token)
         //const token = jwt.sign({ userId: user._id }, jwtkey)
 

        res.setHeader("Content-Type", "application/json")
        const a = JSON.stringify({ "token": token })
        return res.status(200).json({ token });
    }
    catch (err) {
        console.log(3)
        console.log(err)
        res.status(500).json({ "error": "Something went Wrong! Try Again" })
    }
})


//edit profile information
router.patch('/', requireToken, async (req, res) => {
    try {
        console.log(req.body)
        const accountInfo = await User.findByIdAndUpdate({ _id: req.user._id }, req.body);
        console.log(accountInfo)
        res.status(200).json({ "status": "success" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ "error": "failed" })
    }
})

router.get('/profile', requireToken, async (req, res) => {
    try {
        const userDetails = await User.findById({ _id: req.user._id },{tokens:0,_id:0,userVerified:0,password:0});
        res.status(200).json({userDetails })
    }
    catch (err) {
        res.status(500).json({ "error": "Connection Failed! Try Again" })
    }
})


router.delete('/', requireToken, async (req, res) => {
    try {
        const accountInfo = await User.findByIdAndDelete({ _id: req.user._id });
        res.json({ "status": "Successfully Delete", accountInfo })
    }
    catch (err) {
        res.json({ "error": "Connection Failed! Try Again" })
    }
})


module.exports = router;