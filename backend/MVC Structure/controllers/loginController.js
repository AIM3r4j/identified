require("dotenv").config()
const jwt = require("jsonwebtoken")
const logger = require("../../modules/el")
const mfa = require("../../modules/mfa")
const User = require("../models/user")

const loginUser = async (req, res) => {
  try {
    const returned = await mfa.login(req.body.uname_email, req.body.password)
    if (returned instanceof Error) {
      res.json({
        success: false,
        error: {
          message: returned.message,
        },
      })
    } else {
      res.status(200).json({
        success: true,
        message: returned,
      })
    }
  } catch (error) {
    return error
  }
}

const validateOTP = async (req, res) => {
  try {
    const validated = await mfa.matchOTP(req.body.code, req.body.email)
    if (validated) {
      const user = await User.findOne({
        email: req.body.email,
      })
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
      req.session.authenticated = true
      req.session.username = user.username
      req.session.role = user.role
      req.session.token = token
      res.status(200).json({
        success: true,
        user: {
          username: user.username,
          role: user.role,
          permissions: user.permissions,
        },
        token: token,
        message: "Succesfully Logged In",
      })
      logger.logLogin(req.session.username, new Date().toTimeString())
    } else {
      res.json({
        success: "false",
        error: {
          message: "Incorrect OTP",
        },
      })
    }
  } catch (error) {
    console.log(error)
    return error
  }
}

module.exports = {
  loginUser,
  validateOTP,
}
