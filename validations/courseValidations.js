const mongoose = require("mongoose");
const { body, param } = require("express-validator");
const courseModel = require("../model/courses/Courses.model");
const { NotFoundError} = require("../helper/customErrors");
const {withValidationErrors}=require("../middleware/validationMiddleware")

const validateCourseRegister = [
  body("courseImage").notEmpty().withMessage("courseImage is required"),
  body("courseTitle").notEmpty().withMessage("courseTitle is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("details").notEmpty().withMessage("details is required"),
  body("courseOverview").notEmpty().withMessage("courseOverview is required"),
  ];
      
const courseIdParamsValidation = [
      param("id").custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) {
          throw new Error("Invalid MongoId");
        }
        const course = await courseModel.findById(value);
        if (!course) {
          throw new NotFoundError("No Course Found");
        }
      }),
    ];

    const courseValidate = withValidationErrors(validateCourseRegister);
    const courseValidateParams = withValidationErrors(courseIdParamsValidation);

  module.exports = {
    courseValidate,
    courseValidateParams
  };
  