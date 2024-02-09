const mongoose = require("mongoose")

// User Schema

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add a username"],
        unique: [true, "Username already in use"],
    },
    email: {
        type: String,
        required: [true, "Please add an email account"],
        unique: [true, "Email already in use"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.00
    }

}, { timestamp: true })

const User = mongoose.model('User', userSchema);
module.exports = User;