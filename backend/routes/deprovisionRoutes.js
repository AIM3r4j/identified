const router = require("express").Router()
const deprovisionController = require("../MVC Structure/controllers/deprovisionController")

router.get("", deprovisionController.deprovision)

module.exports = router
