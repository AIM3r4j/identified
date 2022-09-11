// Credential Management Module

require("dotenv").config()

const generator = require("generate-password")

const User = require("../../MVC Structure/models/user")

const changeEmail = async (previous_email, new_email) => {
  try {
    const user = await User.findOne({
      email: previous_email,
    })
    if (!user) {
      throw Error("User not found")
    } else {
      return [user.email, new_email]
    }
  } catch (error) {
    return error
  }
}

const changePassword = async (email) => {
  try {
    const user = await User.findOne({
      email: email,
    })
    if (!user) {
      throw Error("User not found")
    } else {
      const new_password = generator.generate({
        length: 10,
        numbers: true,
      })
      return [user.email, new_password]
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  changeEmail,
  changePassword,
}
