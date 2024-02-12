const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")
const {
    getBalance,
    addBalance,
    getBetHistory,
    createBet,
    updateBet,
    deleteBet
} = require("../controllers/betsController")




router.use(validateToken);
// router.route('/history').get(getHistory);
router.route("/balance").get(getBalance).put(addBalance);
router.route("/bet").get(getBetHistory).post(createBet)
router.route("/bet/:id").put(updateBet).delete(deleteBet)

// router.route('/bet').post(createEntry).put(createEntry).delete(deleteEntry);



module.exports = router