const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    createdAt: Date,
    text: String,
    user:{
        user_id: String,
        name: String
    }
    
});

module.exports = mongoose.model("Message", messageSchema);