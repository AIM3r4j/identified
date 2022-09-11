const logger = require("../../modules/el")
const apd = require("../../modules/apd")

const deprovision = async (req, res) => {
  try {
    const done = await apd.deprovision()
    if (done instanceof Error) {
      res.json({
        success: false,
        error: {
          message: done.message,
        },
      })
    } else {
      res.json({
        success: true,
        message: "Successfully deprovisioned all the users",
      })
      logger.logAction(
        "deprovision",
        req.session.username,
        new Date().toTimeString()
      )
    }
  } catch (error) {}
}

module.exports = {
  deprovision,
}
