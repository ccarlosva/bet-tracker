const mongoose = require('mongoose')
//  Bets schema

const betSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        default: 10.00
    },
    won: {
        type: String,
        enum: ['Won', 'Lost', 'Pushed'],
        required: [true, "Please indicate the bet status"],
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Bet = mongoose.model('Bet', betSchema);
module.exports = Bet