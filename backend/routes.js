const express = require("express")
const router = express.Router()

const authenticate = require("./middlewares/authenticator")

const loginRoutes = require("./routes/loginRoutes")

const credentialManagementRoutes = require("./routes/credentialManagementRoutes")
const roleManagementRoutes = require("./routes/roleManagementRoutes")
const reviewAccessRoutes = require("./routes/reviewAccessRoutes")
const provisionRoutes = require("./routes/provisionRoutes")
const deprovisionRoutes = require("./routes/deprovisionRoutes")

router.use("/provision", authenticate, provisionRoutes)
router.use("/deprovision", authenticate, deprovisionRoutes)
router.use("/manage/credential", authenticate, credentialManagementRoutes)
router.use("/manage/role", authenticate, roleManagementRoutes)
router.use("/reviewaccess", authenticate, reviewAccessRoutes)

router.use("/login", loginRoutes)

router.use((req, res) => {
  res.status(404).render("error")
})

module.exports = router
