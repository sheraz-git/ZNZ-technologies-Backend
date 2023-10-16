const User = require("../../model/Users/user.model");
const { success, error } = require("../../helper/response");
const { sign } = require("../../middleware/Authentication");

exports.userRegisterCtrl = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return error("Email and password already exists", "CONFLICT", res);
      } else {
        return error("UserName already exists. Please try a different one.", "CONFLICT", res);
      }
    }
    const newUser = await User.create({
      name,
      userName,
      email,
      password,
    });
    const token = sign({ userId: newUser._id });
    res.cookie("token", token, {
      maxAge: 2592000,
    });
    success("Registration Successful", { newUser, token }, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.userLoginCtrl = async (req, res) => {
  try {
    const { userName, email, password } = req.body;    
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
      return error("Invalid credentials", "UNAUTHORIZED", res);
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return error("Invalid password", "UNAUTHORIZED", res);
    }
    if (user.status !== "active") {
      return error("Account is blocked. Please contact the administrator.", "UNAUTHORIZED", res);
    }
    const token = sign({ userId: user._id });
    res.cookie("token", token, {
      maxAge: 30 * 60 * 1000, 
    });
    success("User Login Successful", { data: user, token }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getProfileCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    user
      ? success("User", { data: user }, "OK", res)
      : error("UserNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllUsersCtrl = async (req, res) => {
  try {
    const users = await User.find({});
    success("Users", { data: users }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateUserInfoCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      user.set(req.body);
      const updatedUser = await user.save();
      success("User", { data: updatedUser }, "OK", res);
    } else {
      error("UserNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deleteUserCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      await User.findByIdAndDelete(user);
      success("User-deleted", { data: user }, "OK", res);
    } else {
      error("UserNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateUserStatusCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};



// Follow a User
exports.followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id == id) {
   return error("Action Forbidden", "FORBIDDEN", res);
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);
      if (!followUser.followers.includes(_id)) {
       const FollowerUser=await followUser.updateOne({ $push: { followers: _id } });
       const FollowingUser= await followingUser.updateOne({ $push: { following: id } });
        success("User followed!", { data: FollowerUser,FollowingUser }, "OK", res);
      } else {
        return error("you are already following this id", "FORBIDDEN", res);
      }
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  }
};

// Unfollow a User
// changed
exports.unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if(_id === id)
  {
    return error("Action Forbidden", "FORBIDDEN", res);
  }
  else{
    try {
      const unFollowUser = await User.findById(id)
      const unFollowingUser = await User.findById(_id)
      if (unFollowUser.followers.includes(_id))
      {
        const UnFollowUser= await unFollowUser.updateOne({$pull : {followers: _id}})
        const UnFollowingUser= await unFollowingUser.updateOne({$pull : {following: id}})
        success("User unFollowed!", { data: UnFollowUser,UnFollowingUser }, "OK", res);
      }
      else{
        return error("You are not following this User", "FORBIDDEN", res);
      }
    } catch (error) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  }
};
