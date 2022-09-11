PERMISSIONS = {
  a: {
    name: "modify user",
    can: "add, remove or modify user and user info",
  },
  b: {
    name: "add to database",
    can: "add new identity in database",
  },
  c: {
    name: "modify info in database",
    can: "modify all identity info in database",
  },
  d: {
    name: "modify partial info in database",
    can: "modify birthdate info in database",
  },
}
module.exports = PERMISSIONS
