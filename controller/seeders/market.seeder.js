const marketModel = require("../../model/seeders/market.model");
const csvtojson = require("csvtojson");

exports.MarketSeeder = async function (req, res) {
  try {
    const marketData = await marketModel.find({});
    console.log(marketData);

    const count = await marketModel.count();
    console.log(count);

    if (marketData == null) {
      return res.status(200).json({
        message: "market list Data",
        marketData,
      });
    } else if (marketData == "") {
      const seedData = [
        {
          market: "School",
        },
        {
          market: "Market",
        },
      ];
      csvtojson()
        .fromFile("public/market.csv")
        .then(async (csvData) => {
          // console.log(csvData);
          await marketModel.insertMany(seedData).then((res1) => {
            return res.status(200).json({
              message: "Market added successfuly!",
            });
          });
        });
    } else {
      return res.status(200).json({
        message: "market already exist",
        marketData,
      });
    }
  } catch (error) {
    console.log("---------", error);
    return res.status(500).json({
      error:
        "Something went wrong which is why category collection is not working",
    });
  }
};
