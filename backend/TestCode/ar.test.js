const ar = require("../modules/ar")

jest.mock("../modules/ar")
jest.setTimeout(10000)

describe("Access Review Test Suite", () => {
  describe("Critical user removal", () => {
    it("should return the critical users being removed", async () => {
      let users = [["testuser1@gmail.com", "admin"]]

      const returnedResult = await ar.initiateCriticalRemoval(users)
      expect(returnedResult).toEqual(users)
    })
  })
})
