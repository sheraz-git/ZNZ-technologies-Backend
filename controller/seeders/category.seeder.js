const Category = require("../../model/seeders/categories.model");
const csvtojson = require("csvtojson");

exports.CategorySeeder = async function (req, res) {
  try {
    const categoriesData = await Category.find({});

    const count = await Category.countDocuments();

    if (count === 0) {
      const seedData = [];

      // Read subcategories from the CSV file
      const csvData = await csvtojson().fromFile("public/categories.csv");

      // Loop through CSV data and insert categories and subcategories
      for (const row of csvData) {
        const mainCategory = row["Main Category"];
        const subcategory = row["Subcategory"];
        const additionalSubcategories = row["Additional Subcategories"].split(",").map((additional) => additional.trim());

        // Find or create main category
        let category = seedData.find((item) => item.name === mainCategory);
        if (!category) {
          category = {
            name: mainCategory,
            subcategories: [],
          };
          seedData.push(category);
        }

        // Find or create subcategory within main category
        let subCategory = category.subcategories.find((item) => item.name === subcategory);
        if (!subCategory) {
          subCategory = {
            name: subcategory,
            additionalSubCategories: [],
          };
          category.subcategories.push(subCategory);
        }

        // Add additional subcategories to subcategory
        subCategory.additionalSubCategories.push(...additionalSubcategories);
      }

      // Insert categories and subcategories into the database
      for (const categoryData of seedData) {
        const category = new Category({
          name: categoryData.name,
          subcategories: categoryData.subcategories.map((subCategory) => ({
            name: subCategory.name,
            additionalSubCategories: subCategory.additionalSubCategories,
          })),
        });
        await category.save();
      }

      return res.status(200).json({
        message: "Categories and subcategories added successfully!",
      });
    } else {
      return res.status(200).json({
        message: "Categories already exist",
        categoriesData,
      });
    }
  } catch (error) {
    console.log("---------", error);
    return res.status(500).json({
      error: "Something went wrong while seeding categories",
    });
  }
};