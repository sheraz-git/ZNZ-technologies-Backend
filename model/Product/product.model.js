const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    picture: {
      type: Array,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      require: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
