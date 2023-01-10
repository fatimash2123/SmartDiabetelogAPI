const express = require("express");
const router = express.Router();
const Cholesterol = require("../models/Cholesterol")
const requireToken = require("../middlewares/requireToken");

// view a particular Cholesterol instance using its id
router.get('/instance/:id', requireToken, async (req, res) => {
    try {
        const id = req.params.id;
        const c = await Cholesterol.findById({ _id: id });
        console.log(c)
        res.status(200).json(c)
    }
    catch (err) {
        res.status(500).json({ "error": "Connection Failed! Try Again" })
    }
})

// view all cholesterol instances of the week
router.get('/:sdate/:edate', requireToken, async (req, res) => {
    try {
        const sdate = req.params.sdate;
        const edate = req.params.edate;
        let bs = await Cholesterol.find({
            createdAt: { $gte: sdate, $lte: edate }
        });
        res.status(200).json(bs)
    }
    catch (err) {
        res.status(500).json({ "error": "Connection Failed! Try Again" })
    }
})

// add new Cholesterol instance
router.post('/', requireToken, async (req, res) => {
    console.log(req.body)
    try {
        const { hdl, ldl, triglycerides, description } = req.body;
        const user_id = req.user._id;
        const c = new Cholesterol({hdl, ldl, triglycerides, description, user_id });
        c.save()
        res.status(200).json({ "status": "Stored Successfully" })
    }
    catch (err) {
        res.status(500).json({ "error": "Not Stored! Try Again" })
    }

})

// update a particular cholesterol instance using its id
router.patch('/instance/:id', requireToken, async (req, res) => {
    try {
        const id = req.params.id;
        const bp = await Cholesterol.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).json({ "status": "Successfully Updated" })
    }
    catch (err) {
        res.status(500).json({ "error": "Connection Failed! Try Again" })
    }
})

// delete a particular cholesterol instance using its id
router.delete('/instance/:id', requireToken, async (req, res) => {
    try {
        const id = req.params.id;
        const bp = await Cholesterol.findByIdAndDelete({ _id: id }, req.body);
        res.status(200).json({ "status": "Successfully Deleted" })
    }
    catch (err) {
        res.status(500).json({ "error": "Connection Failed! Try Again" })
    }
})

module.exports = router;