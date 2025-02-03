const mongoose = require("mongoose");

const CodingQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    exampleInput: { type: String, required: true },
    exampleOutput: { type: String, required: true },
    constraints: { type: String, required: true },  // For example, input/output size constraints
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("CodingQuestion", CodingQuestionSchema);