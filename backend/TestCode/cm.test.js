const cm = require("../modules/cm")
const dbConnection = require("../lib/dbConnection")

jest.mock("../modules/cm")
jest.setTimeout(15000)

describe("Credential Management Test Suite", () => {
  beforeAll(async () => {
    await dbConnection.connectDB()
  })
  afterAll(async () => {
    await dbConnection.close()
  })
  describe("User's Email Change", () => {
    it("should return the user's email and new assigned email", async () => {
      let email = "testuser1@gmail.com"
      let new_email = "testuser2@gmail.com"
      const expectedResult = [email, new_email]

      const returnedResult = await cm.changeEmail(email, new_email)
      expect(returnedResult).toEqual(expectedResult)
    }),
      it("should return an error", async () => {
        let email = "nonexisting1@gmail.com"
        let new_email = "nonexisting2@gmail.com"

        const returnedResult = await cm.changeEmail(email, new_email)
        expect(returnedResult.message).toEqual("User not found")
      })
  }),
    describe("User's Password Change", () => {
      it("should return the user's email and new assigned password", async () => {
        let email = "testuser1@gmail.com"

        const returnedResult = await cm.changePassword(email)
        expect(returnedResult[0]).toEqual(email)
        expect(typeof returnedResult[1]).toBe("string")
      }),
        it("should return an error", async () => {
          let email = "nonexisting@gmail.com"

          const returnedResult = await cm.changePassword(email)
          expect(returnedResult.message).toEqual("User not found")
        })
    })
})
