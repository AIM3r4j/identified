// Entitlement Management Module
const User = require("../../MVC Structure/models/user")
const scheduler = require("node-schedule")

const assignEntitlement = async (user, role, periodInHours) => {
  try {
    const result = await User.findOne({
      email: user.email,
    })
    if (result != null) {
      if (periodInHours != null) {
        let date = new Date()
        date.setHours(date.getHours() + parseInt(periodInHours))
        return [user, role, date]
      }
    } else {
      throw Error("Could not assign the entitlement")
    }
  } catch (error) {
    return error
  }
}

const removeEntitlement = async (user, role) => {
  try {
    const result = await User.findOne({
      email: user.email,
    })
    if (result != null) {
      return [user, role]
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
