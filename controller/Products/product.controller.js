const productModel = require("../../model/Product/product.model");
const { success, error } = require("../../helper/response");

exports.ProductRegisterCtrl = async (req, res) => {
  try {
    const { picture,productName, description, seller, details, price } = req.body;
    const newProduct = await productModel.create({
      productName,
      picture,
      description,
      seller,
      details,
      price,
    });
    success("Product Added Successfully", { data: newProduct }, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getProfileCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id).populate("user");
    product
      ? success("Product fetch Successfully", { data: product }, "OK", res)
      : error("ProductNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllProductsCtrl = async (req, res) => {
  try {
    success("fetch All Product Successfully", { data: res.results }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateProductInfoCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (product) {
      product.set(req.body);
      const updatedProduct = await productModel.save();
      success(
        "Product Update Successfully",
        { data: updatedProduct },
        "OK",
        res
      );
    } else {
      error("ProductNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deleteProductCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (product) {
      await productModel.findByIdAndDelete(product);
      success("Product-deleted", { data: "Success" }, "OK", res);
    } else {
      error("ProductNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};
