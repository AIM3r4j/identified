const logger = require("../../modules/el")
const ar = require("../../modules/ar")

const reviewAccess = async (req, res) => {
  try {
    const criticalUsers = await ar.gatherCriticalUsers()
    const done = await ar.initiateCriticalRemoval(criticalUsers)
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
        message: "Successfully reviewed all access",
      })
      logger.logAction(
        "reviewAccess",
        req.session.username,
        new Date().toTimeString()
      )
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  reviewAccess,
}
