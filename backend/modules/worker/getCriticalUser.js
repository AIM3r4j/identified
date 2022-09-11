const { isMainThread, workerData, parentPort } = require("node:worker_threads")

const scheduler = require("node-schedule")

if (!isMainThread) {
  const userDetails = workerData[0]
  const user = workerData[1]

  const otherRoles = userDetails.roles.slice(1)
  const expectedJobNames = []
  for (let role in otherRoles) {
    expectedJobNames.push(`${user[1]}_${otherRoles[role]}`)
  }
  const jobNames = Object.keys(scheduler.scheduledJobs)
  let criticalUser = []
  for (let expectedJobName in expectedJobNames) {
    if (jobNames.includes(expectedJobNames[expectedJobName]) == false) {
      criticalUser.push(expectedJobNames[expectedJobName].split("_"))
    }
  }
  parentPort.postMessage(criticalUser)

  process.exit(1)
}
