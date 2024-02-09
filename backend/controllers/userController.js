const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const passwordSchema = require("../passwordValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// desc Create User
// @route Post /api/user
// access public 
const createUser = asyncHandler(async (req, res) => {
    // Gets the user information from the request
    const { userName, email, password } = req.body
    // Verifies all the information is present
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    // Checks if the email is available
    const availableEmail = await User.findOne({ email });
    const availableUser = await User.findOne({ userName })

    if (availableUser) {
        res.status(400);
        throw new Error("Username already in use");
    } if (availableEmail) {
        res.status(400);
        throw new Error("Email already in use");
    }

    // Should the password validation should be on a different file or a function? ??
    const validPassword = await passwordSchema.validate(password);
    if (!validPassword) {
        res.status(400)
        throw new Error(`Invalid Password. Please ensure that it meets the following criteria: Minimum length of 8 characters
        At least one uppercase letter
        At least one lowercase letter
        At least one digit
        No spaces allowed
        At least one special character
        Must not be one of the commonly used passwords.`)
    }

    //Hashes password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creates user on database
    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
});

// desc Login a user
// @route Post /api/user
// access public 
const createLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" });
        res.status(200).json({ accessToken });
        console.log("login Successful");
    } else {
        res.status(401);
        throw new Error("Incorrect Credentials");
        
    }    
});

const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Update successful"})
});

const deleteUser = asyncHandler(async (req, res) => {

});


const getUser = asyncHandler(async (req, res) => {

});




module.exports = { createUser, createLogin, updateUser }