const Post = require("../../model/Post/post.model");
const { success, error } = require("../../helper/response");
const cloudinary = require("../../connections/cloudinary");
exports.postImageCtrl = async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "shyMp",
      });
      const URL=result.secure_url
      const postId = req.body.PostId;
      const updateProduct = await Post.findByIdAndUpdate(postId, {
        $push: { picture:URL  },
      });
    success("Image Upload Successfully",{ URL, updateProduct },"CREATED",res);
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };

exports.PostContentCtrl = async (req, res) => {
    try {
      const { picture,content,user } = req.body;
      const newPost = await Post.create({
        picture,content,user
      });
       success("Post Added Successfully", { data: newPost }, "CREATED", res);
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };

exports.getPostCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    post
      ? success("Post fetch Successfully", { data: post }, "OK", res)
      : error("PostNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllPostsCtrl = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    success("fetch All Posts Successfully", { data: posts }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllPostsByUserIdCtrl = async (req, res) => {
  try {
    const user=req.params.id;
    const post = await Post.find({user}).populate("user");
    success("fetch All Posts Of Specific User", { data: post }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updatePostInfoCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post) {
      post.set(req.body);
      const updatedPost = await post.save();
      success("Post Update Successfully", { data: updatedPost }, "OK", res);
    } else {
      error("PostNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deletePostCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post) {
      await Post.findByIdAndDelete(post);
      success("Post-deleted", { data: "Success" }, "OK", res);
    } else {
      error("PostNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

// like/dislike a post
exports.likeAPostCtrl = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return error("PostNotFound", "NOT_FOUND", res);
    }
    if (post.likes.includes(userId)) {
     const updatedPost= await Post.findByIdAndUpdate(id, {
        $pull: { likes: userId },
      }, { new: true });
      success("Post disliked", { data: updatedPost }, "OK", res);
    } else {
      const updatedPost =await Post.findByIdAndUpdate(id, {
        $push: { likes: userId },
      }, { new: true }).populate("likes")
      success("Post liked", { data: updatedPost }, "OK", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.sharePostsCtrl = async (req, res) => {
  try {
    const userId = req.params.id;
    const {postId}=req.body;
    const sharePost = await Post.create({
      userId:id,
      postId:postId
    });
     success("Post Share Successfully", { data: sharePost }, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};


