const express = require("express");
const examController = require("../controllers/examcontroller");


const router = express.Router();

router.route("/").get(examController.getExam).post( examController.createExam);

module.exports = router;
