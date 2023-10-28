const express = require("express");
const {
  coursesRegisterCtrl,
  getCourseCtrl,
  getAllCoursesCtrl,
  updateCoursesInfoCtrl,
  deleteCourseCtrl,
  uploadVideoCtrl,
} = require("../../controller/courses/Courses.controller");
const {
  courseValidate,
  courseValidateParams,
} = require("../../validations/courseValidations");
const { authenticate } = require("../../middleware/Authentication");
const advanceResults = require("../../middleware/AdvanceResults");
const CoursesModel = require("../../model/courses/Courses.model");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const router = express.Router();

router.post(
  "/uploadVideoCtrl",
  authenticate,
  multer({ storage: storage }).single("file"),
  uploadVideoCtrl
);
router.post(
  "/coursesRegisterCtrl/:userId",
  courseValidate,
  authenticate,
  coursesRegisterCtrl
);
router.get(
  "/getCourseCtrl/:id",
  courseValidateParams,
  authenticate,
  getCourseCtrl
);
router.get(
  "/getAllCoursesCtrl",
  authenticate,
  advanceResults(CoursesModel),
  getAllCoursesCtrl
);
router.put(
  "/updateCoursesInfoCtrl/:id",
  courseValidate,
  authenticate,
  updateCoursesInfoCtrl
);
router.delete(
  "/deleteCourseCtrl/:id",
  courseValidateParams,
  authenticate,
  deleteCourseCtrl
);

module.exports = router;
