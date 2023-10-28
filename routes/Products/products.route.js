const express=require("express");
const Product=require("../../controller/products/product.controller");
const {authenticate}=require("../../middleware/authentication");
const AdvanceResults=require("../../middleware/advanceResults");
const ProductModel=require("../../model/products/product.model");
const router = express.Router();
// router.post("/ProductRegister",authenticate,Product.ProductRegisterCtrl);
// router.get("/ProductProfile/:id",authenticate,Product.getProfileCtrl);
// router.get("/getAllProduct",authenticate,AdvanceResults(ProductModel,"user"),Product.getAllProductsCtrl);
// router.put("/ProductUpdate/:id",authenticate,Product.updateProductInfoCtrl);
// router.delete("/deleteProduct/:id",authenticate,Product.deleteProductCtrl);

module.exports = router;