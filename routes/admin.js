const express = require('express');
const router = express.Router()

const admincontroller =  require('./../controllers/admincontroller')
const authenticatecontroller =  require('./../controllers/authenticatecontroller')
const examController = require("../controllers/examcontroller");

router.route("/").get(admincontroller.getcontrol).post(admincontroller.postcontrol)




router.route("/exam/:examId").get(examController.getEditExam).post(examController.postEditExam)
router.route("/exam/delete/:examId").post(examController.deleteExam)



router.route("/create_exam").get(examController.getExam).post( examController.createExam);
router.route("/login").get(admincontroller.logingetcontrol).post(admincontroller.loginpostcontrol)
router.route("/signup").get(admincontroller.signupgetcontrol).post(admincontroller.signuppostcontrol)
router.route("/verify/:id").get(authenticatecontroller.getVerified).post(authenticatecontroller.postVerified)
module.exports=router
