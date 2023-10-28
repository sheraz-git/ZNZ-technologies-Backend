const mongoose = require("mongoose");
const { body, param } = require("express-validator");
const PostModel = require("../model/posts/post.model");
const UserModel = require("../model/users/user.model");
const storiesModel = require("../model/stories/stories.model");
const {NotFoundError} = require("../helper/customErrors");
const { withValidationErrors } = require("../middleware/validationMiddleware");

const postValidation = [
    param("id")
      .custom(async (value) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) {
          throw new Error("Invalid MongoId");
        }
        const user = await UserModel.findById(value);
        if (!user) {
          throw new NotFoundError("UserNotFound");
        }
      }),
    body("content").notEmpty().withMessage("Content is required"),
  ];


const PostIdParamsValidation = [
    param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new Error("Invalid MongoId");
    }
    const post = await PostModel.findById(value);
    if (!post) {
      throw new NotFoundError("No Post Found");
    }
  }),
];

const storiesIdParamsValidation = [
  param("id").custom(async (value) => {
  const isValidId = mongoose.Types.ObjectId.isValid(value);
  if (!isValidId) {
    throw new Error("Invalid MongoId");
  }
  const stories = await storiesModel.findById(value);
  if (!stories) {
    throw new NotFoundError("No stories Found");
  }
}),
];



const validatePostInput = withValidationErrors(postValidation);
const validatePostParams = withValidationErrors(PostIdParamsValidation);
const validateStoriesParams = withValidationErrors(storiesIdParamsValidation);

module.exports = {
  validatePostInput,
  validatePostParams,
  validateStoriesParams
};
