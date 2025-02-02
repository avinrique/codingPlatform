const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, enum: ["MCA", "ISE", "CSE", "ETE", "CIV", "COM", "AI"], required: true },
    semester: { type: Number, min: 1, max: 8, required: true },
    questionType: { type: String, enum: ["mcq", "coding"], required: true },
    numMCQs: { type: Number, required: true },  
    numCoding: { type: Number, required: true },  
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }], 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scheduledAt: { type: Date },
    duration: { type: Number },  
    integrityCheck: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Exam", ExamSchema);
