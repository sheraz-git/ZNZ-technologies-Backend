const express = require("express");
const {
  uploadStoriesCtrl,
  getStoriesCtrl,
  getAllStoriesCtrl,
  deleteStoriesCtrl,
} = require("../controller/stories.controller");
const { authenticate } = require("../middleware/authentication");
const advanceResults = require("../middleware/advanceResults");
const { validateStoriesParams } = require("../validations/postValidations");
const StoriesModel = require("../model/stories.model");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const router = express.Router();
router.post(
  "/uploadStoriesCtrl/:userId",
  authenticate,
  multer({ storage: storage }).single("file"),
  uploadStoriesCtrl
);
router.get(
  "/getStoriesCtrl/:id",
  validateStoriesParams,
  authenticate,
  getStoriesCtrl
);
router.get(
  "/getAllStoriesCtrl",
  authenticate,
  advanceResults(StoriesModel, "userId"),
  getAllStoriesCtrl
);
router.delete(
  "/deleteStoriesCtrl/:id",
  authenticate,
  validateStoriesParams,
  deleteStoriesCtrl
);

module.exports = router;
