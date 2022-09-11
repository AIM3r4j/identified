const router = require("express").Router()
const reviewAccessController = require("../MVC Structure/controllers/reviewAccessController")

router.get("", reviewAccessController.reviewAccess)

module.exports = router
