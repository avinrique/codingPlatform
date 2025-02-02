const express = require('express');

const router = express.Router()

const profilecontroller =  require('./../controllers/profilecontroller')
var fs = require('fs');
var path = require('path');
const multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+".jpg")
  }
});
var upload = multer({ storage: storage });



router.route("/").get(profilecontroller.getprofilecontrol)
router.route("/profile_edit").get(profilecontroller.getprofile_editcontrol).post(upload.single('image'), profilecontroller.profile_editcontrol);
router.route("/changePassword").get(profilecontroller.getchangepasscontrol).post(profilecontroller.changepasscontrol)
module.exports=router
