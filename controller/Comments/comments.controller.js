const commentModel = require("../../model/comments/comments.model");
const { StatusCodes } = require("http-status-codes");
exports.commentRegisterCtrl = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId, text } = req.body;
    const newComment = await commentModel.create({
      text: text,
      userId: userId,
      postId: postId,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Comment Added Successfully", data: newComment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getCommentCtrl = async (req, res) => {
  try {
    const { postId } = req.params;
     const uniqueComment = await commentModel.findById(postId);
     res
      .status(StatusCodes.CREATED)
      .json({ message: "comment fetch Successfully", data: uniqueComment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getAllCommentsCtrl = async (req, res) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({ message: "fetch All Comments Successfully", data: res.results });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.updateCommentInfoCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const Comment = await commentModel.findById(id);
    Comment.set(req.body);
    const updatedComment = await Comment.save();
    res
      .status(StatusCodes.OK)
      .json({ message: "comment Update Successfully", data: updatedComment });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.deleteCommentCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentModel.findById(id);
    await commentModel.findByIdAndDelete(comment);
    res
      .status(StatusCodes.OK)
      .json({ message: "comment-deleted", data: "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
