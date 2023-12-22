const mongoose = require("mongoose");
const Student = require('./Student');


const accountSchema = new mongoose.Schema({
  _id: {
      type: String,
      ref: Student,
      require: true
  },
  pass: {
      type: String,
      require: true
  },
  role: {
      type: String,
      require: true
  }
}, {
  collection: "accounts",
});

module.exports = mongoose.model("Account", accountSchema);
