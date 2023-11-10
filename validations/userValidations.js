const mongoose = require("mongoose");
const { body, param } = require("express-validator");
const UserModel = require("../model/user.model");
const { NotFoundError, BadRequestError,UnauthorizedError } = require("../helper/customErrors");
const {withValidationErrors}=require("../middleware/validationMiddleware")
const validateRegisterInput = withValidationErrors([
     body("name").notEmpty().withMessage("Name is required"),
     body("userName")
      .notEmpty()
      .withMessage("Username is required")
      .custom(async (userName) => {
        const existingUser = await UserModel.findOne({ userName: userName });
        if (existingUser) {
          throw new BadRequestError("userName already exists");
        }
      }),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (email) => {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
          throw new BadRequestError("Email and password already exists");
        }
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ]);
  const validateLoginInput = withValidationErrors([
      body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .custom(async (password, { req }) => {
          const { userName, email } = req.body;
          if (!userName && !email) {
            throw new BadRequestError("Username or email is required");
          }
          const user = await UserModel.findOne({ $or: [{ email }, { userName }] });
          const isMatch = await user.matchPassword(password);
          if (!isMatch) {
            throw new UnauthorizedError("Invalid password");
          }
          if (user.status !== "active") {
            throw new UnauthorizedError(
              "Account is blocked. Please contact the administrator."
            );
          }
        }),
    ]);
    const validateUserIdParams = withValidationErrors([
      param("id").custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) {
          throw new Error("Invalid MongoId");
        }
        const user = await UserModel.findById(value);
        if (!user) {
          throw new NotFoundError("UserNotFound");
        }
      }),
    ]);
  module.exports = {
    validateRegisterInput,
    validateLoginInput,
    validateUserIdParams,
  };
  