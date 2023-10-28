const express = require("express");
const {
  postImageCtrl,
  PostContentCtrl,
  getPostCtrl,
  getAllPostsCtrl,
  updatePostInfoCtrl,
  deletePostCtrl,
  likeAPostCtrl,
  getAllPostsByUserIdCtrl,
} = require("../../controller/posts/post.controller");
const {
  validatePostInput,
  validatePostParams,
} = require("../../validations/postValidations");
const advanceResults = require("../../middleware/advanceResults");
const postModel = require("../../model/posts/post.model");
const marketSeeder = require("../../controller/seeders/MarketSeeder");
const categorySeeder = require("../../controller/seeders/Categoryseeder");
const { authenticate } = require("../../middleware/authentication");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const router = express.Router();
router.post(
  "/postImageCtrl",
  authenticate,
  multer({ storage: storage }).single("file"),
  postImageCtrl
);
router.post(
  "/PostContentCtrl/:id",
  validatePostInput,
  authenticate,
  PostContentCtrl
);
router.get("/getPostCtrl/:id", validatePostParams, authenticate, getPostCtrl);
router.get(
  "/getAllPost",
  authenticate,
  advanceResults(postModel, "userId"),
  getAllPostsCtrl
);

router.patch("/updatePostInfoCtrl/:id", authenticate, updatePostInfoCtrl);

router.delete(
  "/deletePostCtrl/:id",
  validatePostParams,
  authenticate,
  deletePostCtrl
);
router.post("/likeAPostCtrl/:id", authenticate, likeAPostCtrl);

router.get(
  "/getAllPostsByUserIdCtrl/:id",
  authenticate,
  getAllPostsByUserIdCtrl
);

router.get("/MarketSeeder", marketSeeder.MarketSeeder);
router.get("/CategorySeeder", categorySeeder.CategorySeeder);

module.exports = router;
