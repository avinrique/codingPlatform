const User = require("./../models/usermodel");
const Exam = require("../models/Exam");

exports.getcontrol = async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const student = await User.findById(req.user._id); // Get the logged-in student

            if (!student) return res.status(404).json({ error: "Student not found" });

            // Get the current date and time
            const currentTime = new Date();

            // Find exams that match the student's semester and department and are within the valid schedule range
            const exams = await Exam.find({
                semester: student.Semester,
                departments: student.Department,
                scheduledAt: { $lte: currentTime },  // Exam should have started
                scheduledTill: { $gte: currentTime } // Exam should not have ended
            });

            console.log(exams);
            
            const Userprofile = await User.findById(req.user.id);
            res.render("dashboard", { 
                pic: Userprofile.imageurl, 
                logged_in: "true", 
                exams, 
                user: req.user 
            });

        } catch (error) {
            res.status(500).json({ error: "Server Error" });
        }
    } else {
        res.redirect("/");
    }
};




exports.postcontrol = async (req,res)=>{
    try {
        const student = await User.findById(req.user._id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        const exam = await Exam.findById(req.params.examId).populate("mcqQuestions codingQuestions");

        if (!exam) return res.status(404).json({ error: "Exam not found" });

        // Validate if student is eligible
        if (exam.semester !== student.Semester || !exam.departments.includes(student.Department)) {
            return res.status(403).json({ error: "You are not eligible for this exam." });
        }

        res.json({ exam });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}