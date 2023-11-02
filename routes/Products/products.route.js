const express=require("express");
const {
ProductRegisterCtrl,
getProductCtrl,
getAllProductsCtrl,
updateProductInfoCtrl,
deleteProductCtrl
}=require("../../controller/products/product.controller");
const {authenticate}=require("../../middleware/authentication");
const advanceResults=require("../../middleware/advanceResults");
const ProductModel=require("../../model/products/product.model");
const router = express.Router();

router.post("/ProductRegister/:userId",authenticate,ProductRegisterCtrl);
router.get("/getProductCtrl/:id",authenticate,getProductCtrl);
router.get("/getAllProduct",authenticate,advanceResults(ProductModel,"userId"),getAllProductsCtrl);
router.put("/updateProductInfoCtrl/:id",authenticate,updateProductInfoCtrl);
router.delete("/deleteProductCtrl/:id",authenticate,deleteProductCtrl);

module.exports = router;