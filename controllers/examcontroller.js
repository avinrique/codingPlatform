// controllers/examController.js
const Exam = require("../models/Exam");
const Question = require("../models/Question");
exports.getExam = async (req, res) => {
    res.render('create_exam');
}

exports.createExam = async (req, res) => {
    
    try {
        const { department, semester, questionType, numMCQs, numCoding, duration, scheduledAt } = req.body;

        // Find MCQs and coding questions based on selected criteria
        const mcqs = await Question.find({
            department,
            semester,
            type: "mcq"
        }).limit(numMCQs);

        const codingQuestions = await Question.find({
            department,
            semester,
            type: "coding"
        }).limit(numCoding);

        // Create new exam entry
        const newExam = new Exam({
            name: `${department} ${semester} Placement Exam`,
            department,
            semester,
            questionType,
            numMCQs,
            numCoding,
            questions: [...mcqs, ...codingQuestions],
            duration,
            scheduledAt,
            // createdBy: req.user.id  // Assuming req.user is populated with the logged-in user
        });

        // Save the exam to the database
        await newExam.save();
        // res.render('exam');
        res.status(201).json({
            message: "Exam created successfully",
            exam: newExam
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};