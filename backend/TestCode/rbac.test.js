const rbac = require("../modules/rbac")
const dbConnection = require("../lib/dbConnection")

jest.mock("../modules/rbac")
jest.setTimeout(10000)

describe("Role Based Access Control Test Suite", () => {
  beforeAll(async () => {
    await dbConnection.connectDB()
  })
  afterAll(async () => {
    await dbConnection.close()
  })
  describe("Permission Creation", () => {
    it("should return the newly created permission", () => {
      let name = "random name"
      let can = "can do this"

      const returnedResult = rbac.createPermission(name, can)
      const permissionKey = Object.keys(returnedResult)[0]

      expect(returnedResult[permissionKey].name).toEqual(name)
      expect(returnedResult[permissionKey].can).toEqual(can)
    })
  }),
    describe("Role Creation", () => {
      it("should return the newly created role", () => {
        let name = "random name"
        let permissions = ["random1", "random2", "random3"]

        const returnedResult = rbac.createRole(name, permissions)
        expect(Object.keys(returnedResult)[0]).toEqual(name)
        expect(returnedResult[name].permissions).toEqual(permissions)
      })
    }),
    describe("Role Deletion", () => {
      it("should return true", () => {
        let name = "random name"

        const returnedResult = rbac.deleteRole(name)
        expect(returnedResult).toEqual(true)
      })
    }),
    describe("Role Assignment", () => {
      it("should return the newly assigned role with its permissions and the user", async () => {
        let user = {
          email: "testuser1@gmail.com",
        }
        let role = "admin"
        const returnedResult = await rbac.assignRole(user, role)
        expect(returnedResult[0].email).toEqual(user.email)
        expect(returnedResult[1]).toEqual(role)
        expect(returnedResult[2]).toEqual(["a"])
      }),
        it("should return an error", async () => {
          let user = {
            email: "nonexisting@gmail.com",
          }
          let role = "admin"
          const returnedResult = await rbac.assignRole(user, role)
          expect(returnedResult.message).toEqual("Could not assign the role")
        })
    }),
    describe("Role Removal", () => {
      it("should return the removed role with its permissions and the user", async () => {
        let user = {
          email: "testuser1@gmail.com",
        }
        let role = "admin"
        const returnedResult = await rbac.removeRole(user, role)
        expect(returnedResult[0].email).toEqual(user.email)
        expect(returnedResult[1]).toEqual(role)
        expect(returnedResult[2]).toEqual(["a"])
      }),
        it("should return an error", async () => {
          let user = {
            email: "nonexisting@gmail.com",
          }
          let role = "admin"
          const returnedResult = await rbac.removeRole(user, role)
          expect(returnedResult.message).toEqual("Could not remove the role")
        })
    })
})
