const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    picture: {
      type: Array,
      require: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes:{
      type: mongoose.Schema.Types.Array,
      ref: "User",
      default:[]
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
