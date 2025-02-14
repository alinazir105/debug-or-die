const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  solvedQuestions: [
    {
      type: String,
    },
  ],
  totalSubmissions: {
    type: Number,
    default: 0,
  },
  submissions: {
    type: Map,
    of: String, // Stores { "Question Name": "Latest Buggy Code" }
    default: {},
  },
});

module.exports = mongoose.model("User", UserSchema);
