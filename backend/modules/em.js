// Entitlement Management Module

const scheduler = require("node-schedule")
const rbac = require("../modules/rbac")

const assignEntitlement = async (user, role, periodInHours) => {
  try {
    const result = await rbac.assignRole(user, role)
    if (result) {
      if (periodInHours != null) {
        let date = new Date()
        date.setHours(date.getHours() + parseInt(periodInHours))
        scheduler.scheduleJob(`${user.email}_${role}`, date, async function () {
          await removeEntitlement(user, role)
        })
      }
      return true
    } else {
      throw Error("Could not assign the entitlement")
    }
  } catch (error) {
    return error
  }
}

const removeEntitlement = async (user, role) => {
  try {
    const result = await rbac.removeRole(user, role)
    if (result) {
      return true
    } else {
      throw Error("Could not remove the entitlement")
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  assignEntitlement,
  removeEntitlement,
}
