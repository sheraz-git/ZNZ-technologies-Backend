const mongoose = require("mongoose");
const { Schema } = mongoose;
const marketSchema = new Schema({  
  market: {
    type: String,
    enum : ['School','Market'],
    require: true,
  },
});
const market = mongoose.model("Market", marketSchema);
module.exports = market;
