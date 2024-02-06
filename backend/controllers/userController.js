const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const passwordSchema = require("../passwordValidation")
const bcrypt = require("bcrypt")

// desc Create User
// @route Post /api/user
// access public 
const createUser = asyncHandler(async (req, res) => {
    // Gets the user information from the requiest
    const { userName, email, password } = req.body
    
    // Verifies all the information is present
    if (!userName || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    // Checks if the email is available
    const availableEmail = await User.findOne({email});
    const availableUser = await User.findOne({userName})

    if(availableUser){
        res.status(400);
        throw new Error("Username already in use");
    }if (availableEmail) {
        res.status(400);
        throw new Error("Email already in use");
    } 

    const validPassword = passwordSchema.validate(password);
    if(!validPassword){
        res.status(400)
        throw new Error("Invalid Password:")
    }

    //Hashes password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid")
    }
});

// desc Login a user
// @route Post /api/user
// access public 
const createLogin = asyncHandler(async (req, res) => {
    res.json({ message: "Hello from Login" });
});

const updateUser = asyncHandler(async (req, res) => {

});

const deleteUser = asyncHandler(async (req, res) => {

});


const getUser = asyncHandler(async (req, res) => {

});


module.exports = { createUser, createLogin, getUser }