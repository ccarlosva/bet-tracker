const express = require("express")
const router = express.Router()
const { createUser, createLogin,getUser} = require("../controllers/userController")

router.route("/register").post(createUser);
router.route("/login").post(createLogin);


module.exports = router