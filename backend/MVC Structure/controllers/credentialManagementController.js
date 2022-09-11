const logger = require("../../modules/el")
const cm = require("../../modules/cm")

const changeEmail = async (req, res) => {
  try {
    const done = await cm.changeEmail(
      req.body.current_email,
      req.body.new_email
    )
    if (done instanceof Error) {
      logger.logAction(
        "changeEmail",
        req.session.username,
        new Date().toTimeString()
      )

      res.json({
        success: false,
        error: {
          message: "Unable to change the user's email credential",
        },
      })
    } else {
      res.json({
        success: true,
        message: "Successfully changed the user's email credential",
      })
    }
  } catch (error) {
    return error
  }
}

const changePassword = async (req, res) => {
  try {
    const done = await cm.changePassword(req.body.email)

    if (done instanceof Error) {
      logger.logAction(
        "changePassword",
        req.session.username,
        new Date().toTimeString()
      )

      res.json({
        success: false,
        error: {
          message: "Unable to change the user's password credential",
        },
      })
    } else {
      res.json({
        success: true,
        message: "Successfully changed the user's password credential",
      })
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  changeEmail,
  changePassword,
}
