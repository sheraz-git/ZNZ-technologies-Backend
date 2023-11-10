const express = require("express");
const {
  sharePostsCtrl,
  getShareCtrl,
  getAllSharesCtrl,
  deleteShareCtrl,
  getAllPostsOfUserCtrl,
} = require("../../controller/posts/share.controller");
const advanceResults = require("../../middleware/advanceResults");
const { authenticate } = require("../../middleware/authentication");
const { validatePostParams } = require("../../validations/postValidations");
const shareModel = require("../../model/posts/share.model");
const router = express.Router();

router.post("/sharePostsCtrl/:shareId", authenticate, sharePostsCtrl);
router.get(
  "/getShareCtrl/:id", 
  validatePostParams, 
  authenticate, 
  getShareCtrl
  );
router.get(
  "/getAllSharesCtrl",
  authenticate,
  advanceResults(shareModel, "postId shareId"),
  validatePostParams,
  getAllSharesCtrl
);
router.get(
  "/getAllPostsOfUserCtrl/:shareId",
  authenticate,
  validatePostParams,
  advanceResults(shareModel, "postId shareId"),
  getAllPostsOfUserCtrl
);
router.delete(
  "/deleteShareCtrl/:id",
  validatePostParams,
  authenticate,
  deleteShareCtrl
);
module.exports = router;
