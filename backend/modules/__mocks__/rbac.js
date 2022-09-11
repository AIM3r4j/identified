// Role Based Access Control Module

const rolesConfig = require("../../roles.config")
const permissionsConfig = require("../../permissions.config")
const fs = require("fs")

const User = require("../../MVC Structure/models/user")

const createPermission = (permissionName, canDo) => {
  try {
    const char = Object.keys(permissionsConfig).pop()
    const nextChar = String.fromCharCode(char.charCodeAt(0) + 1)
    const permiss = {}
    permiss[nextChar] = {
      name: permissionName,
      can: canDo,
    }

    return permiss
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
    return role
  } catch (error) {
    return error
  }
}

const deleteRole = (roleName) => {
  try {
    return true
  } catch (error) {
    return error
  }
}

const assignRole = async (user, role) => {
  try {
    const result = await User.findOne({
      email: user.email,
    })
    if (result != null) {
      return [user, role, rolesConfig[role].permissions]
    } else {
      throw Error("Could not assign the role")
    }
  } catch (error) {
    return error
  }
}

const removeRole = async (user, role) => {
  try {
    const result = await User.findOne({
      email: user.email,
    })
    if (result != null) {
      return [user, role, rolesConfig[role].permissions]
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
