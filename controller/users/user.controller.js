const User = require("../../model/users/user.model");
const { sign } = require("../../middleware/authentication");
const { StatusCodes } = require("http-status-codes");

exports.userRegisterCtrl = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const newUser = await User.create({
      name,
      userName,
      email,
      password,
      profilePicture: email.charAt(0),
    });
    const token = sign({ userId: newUser._id });
    const oneDay=1000* 60*60*24;
    res.cookie("token",token,{
      httpOnly:true,
      expires:new Date(Date.now()+oneDay)
    })
    res.status(StatusCodes.CREATED).json({ message: "Registration Successful", data: { newUser, token } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.userLoginCtrl = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    const token = sign({ userId: user._id });
    res
      .status(StatusCodes.OK)
      .json({ message: "User Login Successful", data: { user, token } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.userLogoutCtrl = async (req, res) => {
  try {
    res.cookie("token","logout",{
      httpOnly:true,
      expires:new Date(Date.now())
    })
    res
      .status(StatusCodes.OK)
      .json({ message: "User Logout Successful"});
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getProfileCtrl = async (req, res) => {
  try {
    const {id}= req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json({ message: "User", data: { user } });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.getAllUsersCtrl = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ message: "fetch All Users Successfully", data: res.results });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.updateUserInfoCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
      user.set(req.body);
      const updatedUser = await user.save();
      res.status(StatusCodes.OK).json({ message: "User", data: updatedUser });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.deleteUserCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
      await User.findByIdAndDelete(user);
      res.status(StatusCodes.OK).json({ message: "User-deleted", data: "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
exports.updateUserStatusCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const updatedUserStatus = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false }
    );
    res.status(StatusCodes.OK).json({
        message: "User-Status updated successfully",
        data: updatedUserStatus,
      });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

// // Follow a User
// exports.followUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;
//   if (_id == id) {
//    return error("Action Forbidden", "FORBIDDEN", res);
//   } else {
//     try {
//       const followUser = await User.findById(id);
//       const followingUser = await User.findById(_id);
//       if (!followUser.followers.includes(_id)) {
//        const FollowerUser=await followUser.updateOne({ $push: { followers: _id } });
//        const FollowingUser= await followingUser.updateOne({ $push: { following: id } });
//         success("User followed!", { data: FollowerUser,FollowingUser }, "OK", res);
//       } else {
//         return error("you are already following this id", "FORBIDDEN", res);
//       }
//     } catch (err) {
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
//     }
//   }
// };

// // UnFollow a User
// // changed
// exports.unFollowUser = async (req, res) => {
//   const id = req.params.id;
//   const { _id } = req.body;
//   if(_id === id)
//   {
//     return error("Action Forbidden", "FORBIDDEN", res);
//   }
//   else{
//     try {
//       const unFollowUser = await User.findById(id)
//       const unFollowingUser = await User.findById(_id)
//       if (unFollowUser.followers.includes(_id))
//       {
//         const UnFollowUser= await unFollowUser.updateOne({$pull : {followers: _id}})
//         const UnFollowingUser= await unFollowingUser.updateOne({$pull : {following: id}})
//         success("User unFollowed!", { data: UnFollowUser,UnFollowingUser }, "OK", res);
//       }
//       else{
//         return error("You are not following this User", "FORBIDDEN", res);
//       }
//     } catch (error) {
//        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
//     }
//   }
// };
