const express = require("express")
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")
const { createUser, createLogin,updateUser} = require("../controllers/userController")

router.route("/register").post(createUser);
router.route("/login").post(createLogin);
router.route("/user/update").post(validateToken ,updateUser);


module.exports = router