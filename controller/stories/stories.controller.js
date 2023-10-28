const storiesModel = require("../../model/stories/stories.model");
const cloudinary = require("../../connections/cloudinary");
const {StatusCodes}=require("http-status-codes")
exports.uploadStoriesCtrl = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "stories",
    });
    const newStories = await storiesModel.create({
      stories: result.url,
      userId,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "upload Status Successfully", data: newStories });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getStoriesCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const newStories = await storiesModel.findById(id).populate("userId")
    res
    .status(StatusCodes.OK)
    .json({ message: "upload Status Successfully", data: newStories });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getAllStoriesCtrl = async (req, res) => {
  try {
    res
    .status(StatusCodes.OK)
    .json({ message: "fetch All userStories Successfully", data: res.results });
   } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.deleteStoriesCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const userStories = await storiesModel.findById(id);
      await storiesModel.findByIdAndDelete(userStories);
      res
      .status(StatusCodes.OK)
      .json({ message: "Deleted Successfully", data: "success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
