const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: Array,
    required: true,
    default: ["user"],
  },
  permissions: {
    type: Array,
    required: true,
    default: [],
  },
})

const User = mongoose.model("user", userSchema)
module.exports = User
