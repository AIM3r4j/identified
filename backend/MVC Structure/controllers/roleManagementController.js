const rbac = require("../../modules/rbac")
const permissionsConfig = require("../../permissions.config")
const rolesConfig = require("../../roles.config")
const logger = require("../../modules/el")

const getPermissions = (req, res) => {
  try {
    res.json({
      success: true,
      permissions: permissionsConfig,
    })
  } catch (error) {
    return error
  }
}

const getRoles = (req, res) => {
  try {
    res.json({
      success: true,
      roles: rolesConfig,
    })
  } catch (error) {
    return error
  }
}

const createPermission = (req, res) => {
  try {
    const done = rbac.createPermission(req.body.permission_name, req.body.can)
    if (done instanceof Error) {
      res.json({
        success: false,
        error: {
          message: "Unable to create the permission",
        },
      })
    } else {
      logger.logAction(
        "createPermission",
        req.session.username,
        new Date().toTimeString()
      )

      res.json({
        success: true,
        message: "Successfully created the permission",
      })
    }
  } catch (error) {
    return error
  }
}

const createRole = async (req, res) => {
  try {
    const done = rbac.createRole(req.body.role_name, req.body.permissions)
    if (done instanceof Error) {
      res.json({
        success: false,
        error: {
          message: "Unable to create the role",
        },
      })
    } else {
      logger.logAction(
        "createRole",
        req.session.username,
        new Date().toTimeString()
      )

      res.json({
        success: true,
        message: "Successfully created the role",
      })
    }
  } catch (error) {
    return error
  }
}

const deleteRole = async (req, res) => {
  try {
    const done = rbac.deleteRole(req.body.role_name)
    if (done instanceof Error) {
      res.json({
        success: false,
        error: {
          message: "Unable to delete the role",
        },
      })
    } else {
      logger.logAction(
        "deleteRole",
        req.session.username,
        new Date().toTimeString()
      )

      res.json({
        success: true,
        message: "Successfully deleted the role",
      })
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  getPermissions,
  getRoles,
  createPermission,
  createRole,
  deleteRole,
}
