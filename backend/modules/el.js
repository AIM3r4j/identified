// Event Logging Module

const fs = require("fs")

const logAction = (action, initiator, time) => {
  try {
    text = `'${action}' initiated by user '${initiator}' at: ${time}\n`
    fs.writeFileSync("./audit.log", text, { flag: "a+" })
    return text
  } catch (error) {
    return error
  }
}

const logLogin = (user, time) => {
  try {
    text = `User Login: Logged in as '${user}' at: ${time}\n`
    fs.writeFileSync("./login.log", text, { flag: "a+" })
    return text
  } catch (error) {
    return error
  }
}

const logLogout = (user, time) => {
  try {
    text = `User Logout: Logged out as '${user}' at: ${time}\n`
    fs.writeFileSync("./logout.log", text, { flag: "a+" })
    return text
  } catch (error) {
    return error
  }
}

module.exports = {
  logAction,
  logLogin,
  logLogout,
}
