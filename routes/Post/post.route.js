const express = require("express");
const Post = require("../../controller/Post/post.controller");
const marketSeeder = require("../../controller/Seeders/MarketSeeder");
const categorySeeder = require("../../controller/Seeders/Categoryseeder");
const { authenticate } = require("../../middleware/Authentication");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const router = express.Router();
router.post("/postImageCtrl",authenticate,multer({ storage: storage }).single("file"),Post.postImageCtrl);
router.post("/PostContentCtrl", Post.PostContentCtrl);
router.get("/getPostCtrl/:id", authenticate, Post.getPostCtrl);
router.get("/getAllPost", Post.getAllPostsCtrl);
router.patch("/updatePostInfoCtrl/:id", authenticate, Post.updatePostInfoCtrl);
router.delete("/deletePostCtrl/:id", authenticate, Post.deletePostCtrl);
router.post("/likeAPostCtrl/:id",authenticate, Post.likeAPostCtrl);

router.post("/sharePostsCtrl",authenticate,Post.sharePostsCtrl);
router.get("/getAllPostsByUserIdCtrl/:id",authenticate,Post.getAllPostsByUserIdCtrl);

router.get("/MarketSeeder",marketSeeder.MarketSeeder);
router.get("/CategorySeeder",categorySeeder.CategorySeeder);

module.exports = router;