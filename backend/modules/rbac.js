// Role Based Access Control Module

const rolesConfig = require("../roles.config")
const permissionsConfig = require("../permissions.config")
const fs = require("fs")

const User = require("../MVC Structure/models/user")

const createPermission = (permissionName, canDo) => {
  try {
    const char = Object.keys(permissionsConfig).pop()
    const nextChar = String.fromCharCode(char.charCodeAt(0) + 1)
    const permiss = {}
    permiss[nextChar] = {
      name: permissionName,
      can: canDo,
    }
    Object.assign(permissionsConfig, permiss)
    let textToBeWritten = `PERMISSIONS = ${JSON.stringify(
      permissionsConfig,
      null,
      2
    )}\nmodule.exports = PERMISSIONS`
    fs.writeFileSync(
      "C:/Users/afsar/Documents/Security Model Implemented/backend/permissions.config.js",
      textToBeWritten
    )
    return true
  } catch (error) {
    return error
  }
}

const createRole = (roleName, permissions) => {
  try {
    const role = {}
    role[roleName] = {
      permissions: [...permissions],
    }
    Object.assign(rolesConfig, role)
    let textToBeWritten = `ROLES = ${JSON.stringify(
      rolesConfig,
      null,
      2
    )}\nmodule.exports = ROLES`
    fs.writeFileSync(
      "C:/Users/afsar/Documents/Security Model Implemented/backend/roles.config.js",
      textToBeWritten
    )
    return true
  } catch (error) {
    return error
  }
}

const deleteRole = (roleName) => {
  try {
    delete rolesConfig[roleName]
    let textToBeWritten = `ROLES = ${JSON.stringify(
      rolesConfig,
      null,
      2
    )}\nmodule.exports = ROLES`
    fs.writeFileSync(
      "C:/Users/afsar/Documents/Security Model Implemented/backend/roles.config.js",
      textToBeWritten
    )
  } catch (error) {
    return error
  }
}

const assignRole = async (user, role) => {
  try {
    const result = await User.updateOne(
      {
        email: user.email,
      },
      {
        $push: {
          roles: role,
          permissions: rolesConfig[role].permissions,
        },
      }
    )

    if (result.modifiedCount == 1) {
      return true
    } else {
      throw Error("Could not assign the role")
    }
  } catch (error) {
    return error
  }
}

const removeRole = async (user, role) => {
  try {
    const result = await User.updateOne(
      {
        email: user.email,
      },
      {
        $pull: {
          roles: role,
          permissions: {
            $in: rolesConfig[role].permissions,
          },
        },
      }
    )
    if (result.modifiedCount == 1) {
      return true
    } else {
      throw Error("Could not remove the role")
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  createPermission,
  createRole,
  deleteRole,
  assignRole,
  removeRole,
}
