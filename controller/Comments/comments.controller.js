const commentModel = require("../../model/Comments/comments.model");
const { success, error } = require("../../helper/response");
const Post = require("../../model/Post/post.model");

exports.postCommentCtrl = async (req, res) => {
    try {
      const userId = req.params.id;
      const { postId, text } = req.body;  
      // Create a new comment using the commentModel
      const newComment = await commentModel.create({
        text: text, 
        userId: userId, 
        postId: postId,
      });
  
      success("Comment Added Successfully", { data: newComment }, "CREATED", res);
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };

exports.getCommentCtrl = async (req, res) => {
  try {
    const postId = req.params.id;
    const comment = await commentModel.findById(postId);
    comment
      ? success("comment fetch Successfully", { data: comment }, "OK", res)
      : error("commentNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllCommentsCtrl = async (req, res) => {
  try {
    const commentModels = await commentModel.find({});
    success("fetch All commentModels Successfully", { data: commentModels }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateCommentInfoCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("🚀 ~ file: comments.controller.js:46 ~ exports.updateCommentInfoCtrl= ~ id:", id)
    const Comment = await commentModel.findById(id);
    if (Comment) {
      Comment.set(req.body);
      const updatedComment = await commentModel.save();
      success("commentModel Update Successfully", { data: updatedComment }, "OK", res);
    } else {
      error("commentModelNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deleteCommentCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await commentModel.findById(id);
    if (commentModel) {
      await commentModel.findByIdAndDelete(commentModel);
      success("commentModel-deleted", { data: "Success" }, "OK", res);
    } else {
      error("commentModelNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};



