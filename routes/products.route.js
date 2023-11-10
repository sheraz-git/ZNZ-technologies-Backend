const express = require("express");
const {
  ProductRegisterCtrl,
  getProductCtrl,
  getAllProductsCtrl,
  updateProductInfoCtrl,
  deleteProductCtrl,
} = require("../controller/product.controller");
const { authenticate } = require("../middleware/authentication");
const {
  productValidation,
  productIdValidation,
} = require("../validations/productValidations");
const advanceResults = require("../middleware/advanceResults");
const ProductModel = require("../model/product.model");
const router = express.Router();

router.post(
  "/ProductRegister/:userId",
  authenticate,
  productValidation,
  ProductRegisterCtrl
);
router.get(
  "/getProductCtrl/:id",
  authenticate,
  productIdValidation,
  getProductCtrl
);
router.get(
  "/getAllProduct",
  authenticate,
  advanceResults(ProductModel, "userId"),
  getAllProductsCtrl
);
router.put(
  "/updateProductInfoCtrl/:id",
  authenticate,
  productValidation,
  updateProductInfoCtrl
);
router.delete(
  "/deleteProductCtrl/:id",
  authenticate,
  productIdValidation,
  deleteProductCtrl
);

module.exports = router;
