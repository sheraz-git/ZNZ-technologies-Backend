const express=require("express");
const Product=require("../../controller/Products/product.controller");
const {authenticate}=require("../../middleware/Authentication");
const AdvanceResults=require("../../middleware/AdvanceResults");
const ProductModel=require("../../model/Product/product.model");
const router = express.Router();
router.post("/ProductRegister",authenticate,Product.ProductRegisterCtrl);
router.get("/ProductProfile/:id",authenticate,Product.getProfileCtrl);
router.get("/getAllProduct",authenticate,AdvanceResults(ProductModel,"user"),Product.getAllProductsCtrl);
router.put("/ProductUpdate/:id",authenticate,Product.updateProductInfoCtrl);
router.delete("/deleteProduct/:id",authenticate,Product.deleteProductCtrl);

module.exports = router;