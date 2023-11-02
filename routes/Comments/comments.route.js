const express = require("express");
const {
  commentRegisterCtrl,
  getCommentCtrl,
  getAllCommentsCtrl,
  updateCommentInfoCtrl,
  deleteCommentCtrl,
} = require("../../controller/comments/comments.controller");
const { authenticate } = require("../../middleware/authentication");
const advanceResults = require("../../middleware/advanceResults");
const CommentsModel = require("../../model/comments/comments.model");
const router = express.Router();

router.post("/commentRegisterCtrl/:userId", authenticate,commentRegisterCtrl);
// router.get("/getCommentCtrl/:postId", authenticate,getCommentCtrl);
router.get(
  "/getAllCommentsCtrl",
  authenticate,
  advanceResults(CommentsModel,"postId userId"),
  getAllCommentsCtrl
);
router.put("/updateCommentInfoCtrl/:id", updateCommentInfoCtrl);
router.delete("/deleteCommentCtrl/:id",deleteCommentCtrl);

module.exports = router;
