const mongoose = require("mongoose");
const { Schema } = mongoose;
const {Discover}=require("../utils/constants");
const marketSchema = new Schema({  
  market: {
    type: String,
    enum : Object.values(Discover),
    require: true,
  },
});
const market = mongoose.model("Market", marketSchema);
module.exports = market;
