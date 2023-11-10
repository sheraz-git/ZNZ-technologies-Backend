const mongoose = require("mongoose");
const storiesSchema = new mongoose.Schema({
  stories: {
    type: [String],
    required: true,
    default: [],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Stories = mongoose.model("Stories", storiesSchema);
module.exports = Stories;
