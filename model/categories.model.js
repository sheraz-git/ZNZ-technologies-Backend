const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  subcategories: [
    {
      name: {
        type: String,
        required: true,
      },
      additionalSubCategories:[{
        type: String,
        required: true,
      }],
    },
  ],
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;