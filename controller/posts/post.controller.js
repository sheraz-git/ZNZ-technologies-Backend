const Post = require("../../model/posts/post.model");
const cloudinary = require("../../connections/cloudinary");
const { StatusCodes } = require("http-status-codes");

exports.postImageCtrl = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "OLX+FB",
    });
    const URL = result.secure_url;
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Image Upload Successfully", data: { URL } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.PostContentCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { picture, content } = req.body;
    const newPost = await Post.create({
      picture,
      content,
      userId: id,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post Created Successfully", data: { newPost } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getPostCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(StatusCodes.OK).json({ message: "post", data: { post } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getAllPostsCtrl = async (req, res) => {
  try {
    res.status(StatusCodes.OK)
     .json({ message: "fetch All Posts Successfully", data: res.results });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getAllPostsByUserIdCtrl = async (req, res) => {
  try {
    const userId = req.params.id;
    const post = await Post.find({ userId }).populate("userId");
    res.status(StatusCodes.OK)
    .json({ message: "fetch All Posts Of Specific User", data: post });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.updatePostInfoCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    post.set(req.body);
    const updatedPost = await post.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "Post Update Successfully", data: { updatedPost } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.deletePostCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    await Post.findByIdAndDelete(post);
    res
      .status(StatusCodes.OK)
      .json({ message: "Post-deleted", data: "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
// like/dislike a post
exports.likeAPostCtrl = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.likes.includes(userId)) {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
      res
        .status(StatusCodes.OK)
        .json({ message: "Post disliked", data: updatedPost });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { likes: userId } },
        { new: true }
      ).populate("likes");
      res
        .status(StatusCodes.OK)
        .json({ message: "Post liked", data: updatedPost });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

