const mongoose = require("mongoose")

// User Schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add a username"],
        unique: [true, "Username already in use"]
    },
    email: {
        type: String,
        required: [true, "Please add an email account"],
        unique: [true, "Email already in use"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    }

}, { timestamp: true })

const User = mongoose.model('User', userSchema);
module.exports = User;