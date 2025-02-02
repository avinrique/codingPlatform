const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    department: { type: String, enum: ["MCA", "ISE", "CSE", "ETE", "CIV", "COM", "AI"], required: true },
    semester: { type: Number, min: 1, max: 8, required: true },
    type: { type: String, enum: ["mcq", "coding"], required: true },
    question: String,
    
    // For MCQs
    options: [{ type: String }],
    correctAnswer: String, 
    
    // For Coding Questions (HackerRank-like format)
    codingDetails: {
        problemStatement: String,
        inputFormat: String,
        outputFormat: String,
        constraints: String,
        sampleTestCases: [
            {
                input: String,
                expectedOutput: String
            }
        ],
        hiddenTestCases: [
            {
                input: String,
                expectedOutput: String
            }
        ]
    },
    
    difficulty: { type: String, enum: ["easy", "medium", "hard"] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", QuestionSchema);
