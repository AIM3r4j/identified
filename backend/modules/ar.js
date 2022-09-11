// Access Review Module

// Check the promise.all

const { Worker, isMainThread } = require("node:worker_threads")
const User = require("../MVC Structure/models/user")
const accessSheet = require("./apd").accessSheet
const rbac = require("../modules/rbac")

const gatherCriticalUsers = async () => {
  try {
    const provisionSheet =
      "https://docs.google.com/spreadsheets/d/1YoOTk8NIbYvJ-mQcvLmrThI2WFhrNtTUOVgu31mteeQ/edit#gid=0"

    const data = await accessSheet(provisionSheet)
    let criticalUsers = []
    await Promise.all(
      data.map(async (user) => {
        if (user[5] == "TRUE") {
          const givenRole = user[3]
          const userDetails = await User.findOne({
            email: user[1],
          })
          const currentRole = userDetails.roles[0]
          if (givenRole == currentRole) {
            if (isMainThread) {
              new Promise((resolve, reject) => {
                const data = JSON.parse(JSON.stringify([userDetails, user]))
                let worker = new Worker("./modules/worker/getCriticalUser.js", {
                  workerData: data,
                })
                console.log(worker.threadId)
                worker.on(
                  "message",
                  (criticalUser) => {
                    criticalUsers.push(...criticalUser)
                  },
                  resolve
                )
                worker.on("error", reject)
                worker.on("exit", () => {
                  console.log(`thread${worker.threadId} finished`)
                  resolve
                })
              })
            }
          } else {
            criticalUsers.push([user.email, currentRole])
          }
        }
      })
    )
    return criticalUsers
  } catch (error) {
    return error
  }
}

const initiateCriticalRemoval = (criticalUsers) => {
  try {
    criticalUsers.map(async (criticalUser) => {
      const user = {
        email: criticalUser[0],
      }
      const role = criticalUser[1]
      await rbac.removeRole(user, role)
    })
    return true
  } catch (error) {
    return error
  }
}

module.exports = {
  gatherCriticalUsers,
  initiateCriticalRemoval,
}
