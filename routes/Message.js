const express = require("express");
const router = express.Router();
const Message = require("../models/Message")
const requireToken = require("../middlewares/requireToken");
const User = require("../models/User");


router.get('/', requireToken, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).exec();
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', requireToken, async (req, res) => {
    const { createdAt, text } = req.body;
    const user_id = req.user._id;
    User.findOne({ _id: user_id })
        .then(async (user) => {
            const message = new Message({
                user_id: user_id,
                name: user.name,
                createdAt: new Date(createdAt),
                text: text,
            });
            try {
                const result = await message.save();
                res.status(201).json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }

        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        })


});

module.exports = router;