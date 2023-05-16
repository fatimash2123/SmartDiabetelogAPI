const express = require("express");
const router = express.Router();
const Message = require("../models/Message")
const requireToken = require("../middlewares/requireToken");
const User = require("../models/User");

const http = require("http")

const server = http.createServer(router);
const ws = require('socket.io')(server);



// Handle incoming messages
ws.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});

// Handle disconnection
ws.on('close', () => {
    console.log('Client disconnected');
});




router.get('/', requireToken, async (req, res) => {
    try {
        console.log("here in get messages")
        const messages = await Message.find().sort({ createdAt: -1 }).exec();
        // console.log(messages)
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', requireToken, async (req, res) => {

    console.log("here in post messages")
    const { createdAt, text } = req.body;
    console.log(req.body)


    const user_id = req.user._id;
    User.findOne({ _id: user_id })
        .then(async (user) => {
            const message = new Message({
                user: {
                    "user_id": req.user._id,
                    "name": user.name,
                },
                createdAt: new Date(createdAt),
                text: text,
            });
            try {
                const result = await message.save();
                console.log(result)
                res.status(201).json(result);
            } catch (error) {
                console.log("catch1")
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }

        })
        .catch((error) => {
            console.log("catch2")
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        })


});

module.exports = router;