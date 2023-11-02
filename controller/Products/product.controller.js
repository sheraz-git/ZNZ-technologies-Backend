const productModel = require("../../model/products/product.model");
const { StatusCodes } = require("http-status-codes");
exports.ProductRegisterCtrl = async (req, res) => {
  try {
    const { userId } = req.params;
    const { picture, productName, description, details, price } = req.body;
    const newProduct = await productModel.create({
      productName,
      picture,
      description,
      userId,
      details,
      price,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Product Added Successfully", data: newProduct });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const uniqueProduct = await productModel.findById(id);
    res
      .status(StatusCodes.OK)
      .json({ message: "Product fetch Successfully", data: uniqueProduct });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getAllProductsCtrl = async (req, res) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "fetch All Products Successfully", data: res.results });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.updateProductInfoCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    product.set(req.body);
    const updatedProduct = await product.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Product Update Successfully", data: updatedProduct });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.deleteProductCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    await productModel.findByIdAndDelete(product);
    res
      .status(StatusCodes.OK)
      .json({ message: "Product-deleted Successfully", data: "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
