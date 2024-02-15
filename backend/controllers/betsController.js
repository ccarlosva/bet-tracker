const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Bet = require("../models/betModel")
const mongoose = require("mongoose")

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
    if (amount <= 0) {
        res.status(400);
        throw new Error('Invalid amount')
    }
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $inc: { balance: amount } },
            { new: true }
        ).select('userName balance');
        if (!user) {
            res.status(404)
            throw new Error('Unauthorized')
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error('Internal Server Error')
    }
});

//@desc Get bet history 
//@route GET /api/contacts/
//@access private
const getBetHistory = asyncHandler(async (req, res) => {
    const bets = await Bet.find({ user_id: req.user.id });
    res.status(200).json(bets)
});

//@desc Post a bet
//@route POST /api/contacts/
//@access private
const createBet = asyncHandler(async (req, res) => {
    const { amount, won } = req.body;
    if (!amount || !won) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    if (amount <= 0) {
        res.status(400);
        throw new Error('Invalid amount')
    }
    

    console.log(amount)
    // const bet = await Bet.create({
    //     user_id: req.user.id,
    //     amount,
    //     won
    // });

    res.status(200).json({message:"success!"});
    // res.status(200).json(bet);
});

//@desc Update a bet
//@route PUT /api/contacts/
//@access private
const updateBet = asyncHandler(async (req, res) => {

    if (!idValidation(req.params.id)) {
        res.status(404);
        throw new Error("404 Not Found")
    }

    const bet = await Bet.findById(req.params.id);

    if (!bet) {
        res.status(404);
        throw new Error('Bet Not Found');
    }
    if (bet.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Unauthorized');
    }

    const updatedBet = await Bet.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedBet)
});

//@desc Delete a bet
//@route Delete /api/contacts/
//@access private
const deleteBet = asyncHandler(async (req, res) => {
    if (!idValidation(req.params.id)) {
        res.status(404);
        throw new Error("404 Not Found")
    }
    bet = await Bet.findById(req.params.id)

    if (!bet) {
        res.status(404);
        throw new Error("404 Bet not found!")
    }

    if (bet.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized")
    }

    await Bet.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: `Bet: ${bet} deleted!` })
})

function idValidation(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

module.exports = { getBalance, addBalance, getBetHistory, createBet, updateBet, deleteBet }