const mongoose = require("mongoose")
const Schema = mongoose.Schema

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
})

const OTP = mongoose.model("otp", otpSchema)
module.exports = OTP
