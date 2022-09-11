const el = require("../modules/el")

jest.mock("../modules/el")

describe("Event Logging Test Suite", () => {
  describe("Action Logging", () => {
    it("should return the action's logged text", () => {
      let action = "Access Review"
      let initiator = "testUser1"
      let time = new Date().toTimeString()
      const expectedText = `'${action}' initiated by user '${initiator}' at: ${time}\n`

      const returnedText = el.logAction(action, initiator, time)
      expect(returnedText).toEqual(expectedText)
    })
  }),
    describe("Login Logging", () => {
      it("should return the login's logged text", () => {
        let user = "testUser1"
        let time = new Date().toTimeString()
        const expectedText = `User Login: Logged in as '${user}' at: ${time}\n`

        const returnedText = el.logLogin(user, time)
        expect(returnedText).toEqual(expectedText)
      })
    }),
    describe("Logout Logging", () => {
      it("should return the logout's logged text", () => {
        let user = "testUser1"
        let time = new Date().toTimeString()
        const expectedText = `User Logout: Logged out as '${user}' at: ${time}\n`

        const returnedText = el.logLogout(user, time)
        expect(returnedText).toEqual(expectedText)
      })
    })
})
