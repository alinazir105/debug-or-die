const mongoose = require("mongoose");

const QuesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  byggyCode: {
    type: String,
    required: true,
  },
  hints: [
    {
      type: String, // Array of hints
      required: true,
    },
  ],
  noOfSubm: {
    type: Number,
    required: true,
    default: 0,
  },
  noOfSuccess: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Question", QuesSchema);
