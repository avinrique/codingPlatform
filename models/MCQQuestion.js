const mongoose = require("mongoose");

const MCQQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [
        {
            option: { type: String, required: true },
            isCorrect: { type: Boolean, required: true } // Whether this option is correct
        }
    ],
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("MCQQuestion", MCQQuestionSchema);