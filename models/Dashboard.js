const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { jwtkey } = require("../keys")
const jwt = require("jsonwebtoken");

const DashboardSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        unique: true,
        required: true
    },
    userAsked: {
        type: "ObjectId",
        ref: 'User'
    },
    answers: [
        {
            "user_id": { type: "ObjectId", ref: 'User' },
            "answer": { type: String }
        }
    ]

},{timestamps:true})



module.exports = mongoose.model("Dashboard", DashboardSchema);