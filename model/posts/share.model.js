const mongoose = require("mongoose");
const shareSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required:true
  },
  shareId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const share = mongoose.model("share", shareSchema);
module.exports = share;
