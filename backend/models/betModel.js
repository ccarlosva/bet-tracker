const mongoose = require("mongoose");
//  Bets schema

const betSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  result: {
    type: String,
    enum: ["Won", "Lost", "Pushed"],
    required: [true, "Please indicate the bet status"],
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Bet = mongoose.model("Bet", betSchema);
module.exports = Bet;
