const shareModel = require("../../model/share/share.model");
const { StatusCodes } = require("http-status-codes");

exports.sharePostsCtrl = async (req, res) => {
  try {
    const { shareId } = req.params;
    const { postId } = req.body;
    const sharePost = await shareModel.create({
        shareId,
      postId
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post Share Successfully", data: sharePost });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getShareCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const sharePosts = await shareModel.findById(id);
    res.status(StatusCodes.OK).json({ message: "sharePosts fetch Successfully", data: { sharePosts } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getAllSharesCtrl = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "fetch All sharesPosts Successfully", data: res.results });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.deleteShareCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const sharePosts = await shareModel.findById(id);
    await shareModel.findByIdAndDelete(sharePosts);
    res
      .status(StatusCodes.OK)
      .json({ message: "sharePost-deleted", data: "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getAllPostsOfUserCtrl = async (req, res) => {
    try {
      const {shareId} = req.params;
      const sharePosts = await shareModel.find({ shareId }).populate("shareId");
      res.status(StatusCodes.OK)
      .json({ message: "fetch All sharesPosts Of Specific User", data: sharePosts });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
};
  