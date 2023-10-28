const express=require("express");
const Comments=require("../../controller/comments/comments.controller");
const {authenticate}=require("../../middleware/authentication");
const advanceResults=require("../../middleware/advanceResults")
const CommentsModel=require("../../model/comments/comments.model")
const router = express.Router();

// router.post("/postCommentCtrl/:id",authenticate,Comments.postCommentCtrl);
// router.get("/getCommentCtrl/:id",authenticate,Comments.getCommentCtrl);
// router.get("/getAllCommentsCtrl",authenticate,advanceResults(CommentsModel,"postId userId"),Comments.getAllCommentsCtrl);
// router.put("/updateCommentInfoCtrl/:id",Comments.updateCommentInfoCtrl);
// router.delete("/deleteCommentCtrl/:id",Comments.deleteCommentCtrl);

module.exports = router;