const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  // Đặc điểm của trường profile
  fullName: String,
  studentId: String,
  dateOfBirth: Date,
  gender: String,
  faculty: String,
  major: String,
  gpa: Number,
  advisor: String,
}, { strict: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profile: {
    type: profileSchema,
    default: null,
  },
}, {
  collection: "users",
});

module.exports = mongoose.model("User", userSchema);
