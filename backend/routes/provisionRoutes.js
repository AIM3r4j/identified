const router = require("express").Router()
const provisionController = require("../MVC Structure/controllers/provisionController")

router.get("", provisionController.provision)

module.exports = router
