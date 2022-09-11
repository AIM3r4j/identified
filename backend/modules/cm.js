// Credential Management Module

require("dotenv").config()
const bcrypt = require("bcrypt")
const generator = require("generate-password")
const nodemailer = require("nodemailer")

const User = require("../MVC Structure/models/user")

const changeEmail = async (previous_email, new_email) => {
  try {
    const user = await User.findOne({
      email: previous_email,
    })
    if (user != null) {
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            email: new_email,
          },
        }
      )
    } else {
      throw Error("User Not Found")
    }

    return true
  } catch (error) {
    return error
  }
}

const changePassword = async (email) => {
  try {
    const user = await User.findOne({
      email: email,
    })
    const new_password = generator.generate({
      length: 10,
      numbers: true,
    })
    const hashed = await bcrypt.hash(new_password, 10)
    if (user != null) {
      await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            password: hashed,
          },
        }
      )
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASS,
        },
      })
      const mail_details = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "New Login Credentials",
        text: `Your Login credentials: 
        Email: ${user.email}
        Username: ${user.username}
        Password: ${new_password}`,
      }

      transporter.sendMail(mail_details, async (error) => {
        if (error) {
          return error
        }
      })
      return true
    } else {
      throw Error("User Not Found")
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  changeEmail,
  changePassword,
}
