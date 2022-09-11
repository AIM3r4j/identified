const router = require("express").Router()
const roleManagementController = require("../MVC Structure/controllers/roleManagementController")

router.get("/permissions", roleManagementController.getPermissions)
router.get("/roles", roleManagementController.getRoles)
router.post("/permissions", roleManagementController.createPermission)
router.post("/create", roleManagementController.createRole)
router.post("/delete", roleManagementController.deleteRole)

module.exports = router
