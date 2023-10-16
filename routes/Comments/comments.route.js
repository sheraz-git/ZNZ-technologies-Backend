const express=require("express");
const Comments=require("../../controller/Comments/comments.controller");
const {authenticate}=require("../../middleware/Authentication");
const router = express.Router();

router.post("/postCommentCtrl/:id",authenticate,Comments.postCommentCtrl);
router.get("/getCommentCtrl/:id",authenticate,Comments.getCommentCtrl);
router.get("/getAllCommentsCtrl",authenticate,Comments.getAllCommentsCtrl);
// router.put("/updateContactInfoCtrl/:id",Comments.updateContactInfoCtrl);
// router.delete("/deleteContactCtrl/:id",Comments.deleteContactCtrl);

module.exports = router;