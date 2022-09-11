const logger = require("../../modules/el")
const apd = require("../../modules/apd")

const provision = async (req, res) => {
  try {
    const done = await apd.provision()
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
        message: "Successfully provisioned all the users",
      })
      logger.logAction(
        "provision",
        req.session.username,
        new Date().toTimeString()
      )
    }
  } catch (error) {}
}

module.exports = {
  provision,
}
