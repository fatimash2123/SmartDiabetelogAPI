const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    createdAt: Date,
    text: String,
    user_id: String,
    name: String
});

module.exports = mongoose.model("Message", messageSchema);