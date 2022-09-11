// Multi Factor Authentication Module
// We will be using 2FA (Password and OTP in Email)

require("dotenv").config()
const OTP = require("../MVC Structure/models/otp")
const User = require("../MVC Structure/models/user")
const nodemailer = require("nodemailer")
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
        await sendOTP(user.email)
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    const code = otpGenerator.generate(6, { specialChars: false })
    const mail_details = {
      from: process.env.USER_EMAIL,
      to: receiver_email,
      subject: "Verification Code",
      text: `Your verification code is ${code}`,
    }

    transporter.sendMail(mail_details, async (error) => {
      if (error) {
        throw error
      } else {
        const new_otp = new OTP({
          email: receiver_email,
          otp: code,
        })
        await new_otp.save()
        return new_otp
      }
    })
  } catch (error) {
    return error
  }
}

const matchOTP = async (received_otp, receiver_email) => {
  try {
    const sent_otp = await OTP.find({ receiver_email })
      .sort({ $natural: -1 })
      .limit(1)
    if (received_otp == sent_otp[0].otp) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  login,
  sendOTP,
  matchOTP,
}
