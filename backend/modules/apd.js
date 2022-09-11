// Automated Provisioning and De-provisioning Module

const dbConnection = require("../lib/dbConnection")
const { google } = require("googleapis")
const um = require("../external modules/um")
const em = require("./em")
const User = require("../MVC Structure/models/user")

const accessSheet = async (sheetLink) => {
  try {
    const spreadsheetId = sheetLink.split("/")[5]
    const auth = new google.auth.GoogleAuth({
      keyFile:
        "C:/Users/afsar/Documents/Security Model Implemented/backend/credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    const client = await auth.getClient()
    const gSheets = google.sheets({
      version: "v4",
      auth: client,
    })

    const rows = await gSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A2:F",
    })

    return rows.data.values
  } catch (error) {
    console.log(error)
  }
}

const updateDone = async (select, sheetLink, cellNo) => {
  try {
    const spreadsheetId = sheetLink.split("/")[5]
    const auth = new google.auth.GoogleAuth({
      keyFile:
        "C:/Users/afsar/Documents/Security Model Implemented/backend/credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    const client = await auth.getClient()
    const gSheets = google.sheets({
      version: "v4",
      auth: client,
    })
    if (select == "provision") {
      const rows = await gSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `Sheet1!F${cellNo}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[true]],
        },
      })
      return rows.data
    } else {
      const rows = await gSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `Sheet1!C${cellNo}`,
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[true]],
        },
      })
      return rows.data
    }
  } catch (error) {
    console.log(error)
  }
}

const provision = async () => {
  try {
    const provisionSheet =
      "https://docs.google.com/spreadsheets/d/1YoOTk8NIbYvJ-mQcvLmrThI2WFhrNtTUOVgu31mteeQ/edit#gid=0"

    const data = await accessSheet(provisionSheet)

    for (let i = 0; i < data.length; i++) {
      if (data[i][5] != "TRUE" && data[i][2] == "onboarding") {
        const user = await um.addUser({
          name: data[i][0],
          email: data[i][1],
        })
        if (user instanceof Error) {
          throw user
        } else {
          const returned = await em.assignEntitlement(
            user,
            data[i][3],
            data[i][4]
          )
          if (returned == true) {
            await updateDone("provision", provisionSheet, i + 2)
          } else {
            throw Error(`Could not provision the user: ${user.name}`)
          }
        }
      } else if (data[i][5] != "TRUE" && data[i][2] == "promotion") {
        const user = await User.findOne({
          email: data[i][1],
        })
        if (user instanceof Error) {
          throw user
        } else {
          await em.removeEntitlement(user, user.roles[0])

          const returned = await em.assignEntitlement(
            user,
            data[i][3],
            data[i][4]
          )
          if (returned == true) {
            await updateDone("provision", provisionSheet, i + 2)
          } else {
            throw Error(`Could not provision the user: ${user.name}`)
          }
        }
      } else if (data[i][5] != "TRUE" && data[i][2] == "temporary") {
        const user = await User.findOne({
          email: data[i][1],
        })
        if (user instanceof Error) {
          throw user
        } else {
          const returned = await em.assignEntitlement(
            user,
            data[i][3],
            data[i][4]
          )
          if (returned == true) {
            await updateDone("provision", provisionSheet, i + 2)
            return true
          } else {
            throw Error(`Could not provision the user: ${user.name}`)
          }
        }
      } else {
        throw Error("Important field/s left blank at row" + i)
      }
    }
  } catch (error) {
    return error
  }
}
const deprovision = async () => {
  try {
    const deprovisionSheet =
      "https://docs.google.com/spreadsheets/d/1cv-GqbyARo9Hy1zNjkT3PsLmMEZRpGz7s7jj1wu8r7U/edit#gid=0"

    const data = await accessSheet(deprovisionSheet)

    for (let i = 0; i < data.length; i++) {
      if (data[i][2] != "TRUE") {
        const result = await um.removeUser({
          name: data[i][0],
          email: data[i][1],
        })
        if (result == true) {
          await updateDone("deprovision", deprovisionSheet, i + 2)
          return true
        } else {
          throw Error(`Could not deprovision the user: ${data[i][0]}`)
        }
      }
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  provision,
  deprovision,
  accessSheet,
}
