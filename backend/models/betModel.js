const mongoose = require('mongoose')
//  Bets schema

const betSchema = new mongoose.Schema ({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    amount:{
        type: mongoose.Schema.Types.Decimal128,
        default: 10.00
    },
    won:{
        type: Boolean,
        required: [true, "Please indicate if bet was won or lost"],
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Bet = mongoose.model('Bet',betSchema);
module.exports = Bet