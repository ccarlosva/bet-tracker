const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
// const mongoose = require("mongoose")

//@desc Get balance 
//@route GET /api/contacts/
//@access private
const getBalance = asyncHandler(async (req, res) => {

    const user = await User.findOne({ _id: req.user.id })
    if (!user) {
        res.status(404);
        throw new Error("User not found")
    }
    const balance = Number(user.balance.toString());

    res.status(200).json({ balance })
});

//@desc add balance/bank to account 
//@route PUT /api/contacts/
//@access private
const addBalance = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    if(amount <=0 ){
        res.status(400);
        throw new Error('Invalid amount')
    }
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $inc: { balance: amount } },
            { new: true }
        ).select('userName balance');
        if(!user){
            res.status(404)
            throw new Error('Unauthorized')
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

//@desc Get bet history 
//@route GET /api/contacts/
//@access private


//@desc Get historical balance
//@route GET /api/contacts/
//@access private


//@desc Post a bet
//@route POST /api/contacts/
//@access private


//@desc Update a bet
//@route PUT /api/contacts/
//@access private


//@desc Delete a bet
//@route Delete /api/contacts/
//@access private

module.exports = { getBalance, addBalance }