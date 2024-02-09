const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")
const {
    getBalance,
    addBalance
} = require("../controllers/betsController")


router.use(validateToken);
// router.route('/history').get(getHistory);
router.route("/balance").get(getBalance).put(addBalance);

// router.route('/bet').post(createEntry).put(createEntry).delete(deleteEntry);



module.exports = router