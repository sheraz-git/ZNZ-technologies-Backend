const mongoose = require("mongoose");
const { body, param } = require("express-validator");
const productModel = require("../model/product.model");
const { NotFoundError } = require("../helper/customErrors");
const { withValidationErrors } = require("../middleware/validationMiddleware");
const validateProductInput = [
  body("picture").notEmpty().withMessage("picture is required"),
  body("productName").notEmpty().withMessage("productName is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("details").notEmpty().withMessage("details is required"),
  body("price").notEmpty().withMessage("price is required"),
];
const validateProductIdParams = [
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      throw new Error("Invalid MongoId");
    }
    const product = await productModel.findById(value);
    if (!product) {
      throw new NotFoundError("No Product Found");
    }
  }),
];
const productValidation = withValidationErrors(validateProductInput);
const productIdValidation = withValidationErrors(validateProductIdParams);
module.exports = {
  productValidation,
  productIdValidation,
};
