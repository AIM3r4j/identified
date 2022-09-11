const em = require("../modules/em")
const dbConnection = require("../lib/dbConnection")

jest.mock("../modules/em")
jest.setTimeout(10000)

describe("Entitlement Management Test Suite", () => {
  beforeAll(async () => {
    await dbConnection.connectDB()
  })
  afterAll(async () => {
    await dbConnection.close()
  })
  describe("Assign Entitlement", () => {
    it("should return the assigned entitlement's expiry date with the user and role", async () => {
      let user = {
        email: "testuser1@gmail.com",
      }
      let role = "admin"

      const returnedResult = await em.assignEntitlement(user, role, 24)
      expect(returnedResult[0]["email"]).toEqual(user.email)
      expect(returnedResult[1]).toEqual(role)
      expect(typeof returnedResult[2]).toEqual("object")
    }),
      it("should return an error", async () => {
        let user = {
          email: "nonexisting@gmail.com",
        }
        let role = "admin"

        const returnedResult = await em.assignEntitlement(user, role, 24)
        expect(returnedResult.message).toEqual(
          "Could not assign the entitlement"
        )
      })
  }),
    describe("Remove Entitlement", () => {
      it("should return the removed entitlement's role with the user", async () => {
        let user = {
          email: "testuser1@gmail.com",
        }
        let role = "admin"

        const returnedResult = await em.removeEntitlement(user, role)
        expect(returnedResult[0]["email"]).toEqual(user.email)
        expect(returnedResult[1]).toEqual(role)
      }),
        it("should return an error", async () => {
          let user = {
            email: "nonexisting@gmail.com",
          }
          let role = "admin"

          const returnedResult = await em.removeEntitlement(user, role)
          expect(returnedResult.message).toEqual(
            "Could not remove the entitlement"
          )
        })
    })
})
