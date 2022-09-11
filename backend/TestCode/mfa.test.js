const mfa = require("../modules/mfa")
const dbConnection = require("../lib/dbConnection")

jest.mock("../modules/mfa")
jest.setTimeout(15000)

describe("Multi-Factor Authentication Test Suite", () => {
  beforeAll(async () => {
    await dbConnection.connectDB()
  })
  afterAll(async () => {
    await dbConnection.close()
  })
  describe("Login Attempt", () => {
    it("should return a message on successful login", async () => {
      let email = "testuser1@gmail.com"
      let pass = "testuser1"
      const expectedResult = "OTP has been sent to user's email"

      const returnedResult = await mfa.login(email, pass)
      expect(returnedResult).toEqual(expectedResult)
    }),
      it("should return an error on incorrect password input", async () => {
        let email = "testuser1@gmail.com"
        let pass = "incorrect"

        const returnedResult = await mfa.login(email, pass)
        expect(returnedResult.message).toEqual("Incorrect Password")
      }),
      it("should return an error on incorrect username/email input", async () => {
        let email = "nonexisting@gmail.com"
        let pass = "nonexisting"

        const returnedResult = await mfa.login(email, pass)
        expect(returnedResult.message).toEqual("Invalid User")
      })
  }),
    describe("OTP sending process", () => {
      it("should return the generated OTP and the receiver's email", async () => {
        let email = "testuser1@gmail.com"

        const returnedResult = await mfa.sendOTP(email)
        expect(returnedResult[1]).toEqual(email)
        expect(typeof returnedResult[0]).toBe("string")
      })
    })
})
