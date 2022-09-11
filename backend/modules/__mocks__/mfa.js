// Multi Factor Authentication Module
// We will be using 2FA (Password and OTP in Email)

require("dotenv").config()
const User = require("../../MVC Structure/models/user")
const bcrypt = require("bcrypt")

const otpGenerator = require("otp-generator")

const login = async (uname_email, password) => {
  try {
    const user = await User.findOne({
      $or: [{ username: uname_email }, { email: uname_email }],
    })
    if (user == null) {
      throw Error("Invalid User")
    } else {
      const matched = await bcrypt.compare(password, user.password)
      if (matched) {
        return "OTP has been sent to user's email"
      } else {
        throw Error("Incorrect Password")
      }
    }
  } catch (error) {
    return error
  }
}

const sendOTP = (receiver_email) => {
  try {
    const code = otpGenerator.generate(6, { specialChars: false })
    return [code, receiver_email]
  } catch (error) {
    return error
  }
}

module.exports = {
  login,
  sendOTP,
}
