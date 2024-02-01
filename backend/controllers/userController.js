const asyncHandler = require("express-async-handler")

// desc Create User
// @route Post /api/user
// access public 
const createUser = asyncHandler(async (req,res) => {
    res.json({message:"Hello"})
});

// desc Login a user
// @route Post /api/user
// access public 
const createLogin = asyncHandler(async (req,res) => {
    res.json({message:"Hello from Login"});
});

const getUser = asyncHandler(async (req,res) =>{

})

module.exports = { createUser, createLogin,getUser}