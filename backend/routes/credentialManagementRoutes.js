const router = require("express").Router()
const credentialManagementController = require("../MVC Structure/controllers/credentialManagementController")

router.post("/email", credentialManagementController.changeEmail)
router.post("/password", credentialManagementController.changePassword)

module.exports = router
