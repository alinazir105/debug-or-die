const mongoose = require("mongoose");

const QuesSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  buggyCode: {
    type: String,
    required: true,
  },
  examples: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
      },
    },
  ],
  testCases: [
    {
      input: {
        type: String,
        required: true,
      },
      expectedOutput: {
        type: String,
        required: true,
      },
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
