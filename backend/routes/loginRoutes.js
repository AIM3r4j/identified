const router = require("express").Router()
const loginController = require("../MVC Structure/controllers/loginController")

router.post("", loginController.loginUser)
router.post("/validate", loginController.validateOTP)

module.exports = router
