const router = require("express").Router()
const logoutController = require("../MVC Structure/controllers/logoutController")

router.post("", logoutController.logoutUser)

module.exports = router
