// User Management Module

require("dotenv").config()

const bcrypt = require("bcrypt")
const generator = require("generate-password")
const nodemailer = require("nodemailer")

const User = require("../MVC Structure/models/user")

const getAllUser = async () => {
  try {
    const users = await User.find(
      {},
      {
        username: 1,
        name: 1,
        email: 1,
        roles: 1,
        permissions: 1,
      }
    )
    if (users != {}) {
      return users
    } else {
      throw Error("Could not get all the users")
    }
  } catch (error) {
    return error
  }
}

const getUser = async () => {
  try {
    const userinfo = await User.findOne(
      {
        _id: req.params.id,
      },
      {
        username: 1,
        name: 1,
        email: 1,
        roles: 1,
        permissions: 1,
      }
    )
    if (userinfo != {}) {
      return userinfo
    } else {
      throw Error("Could not get the user")
    }
  } catch (error) {
    return error
  }
}

const addUser = async (userInfo) => {
  try {
    const { name, email } = userInfo
    const sernam = (await import("sernam")).default
    const options = {
      symbols: true,
      numbers: true,
    }
    const sn = sernam(options)
    const username = sn.generateOne(name)
    const password = generator.generate({
      length: 10,
      numbers: true,
    })
    const hashed = await bcrypt.hash(password, 10)
    const user = new User({
      username: username,
      name: name,
      email: email,
      password: hashed,
      roles: [],
      permissions: [],
    })
    await user.save()
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
    const mail_details = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "New Login Credentials",
      text: `Your Login credentials: 
      Email: ${email}
      Username: ${username}
      Password: ${password}`,
    }

    transporter.sendMail(mail_details, async (error) => {
      if (error) {
        return error
      }
    })
    return user
  } catch (error) {
    return error
  }
}

const removeUser = async (user) => {
  try {
    const result = await User.deleteOne({
      email: user.email,
    })
    if (result.deletedCount == 1) {
      return true
    } else {
      throw Error("Could not remove the user")
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllUser,
  getUser,
  addUser,
  removeUser,
}
