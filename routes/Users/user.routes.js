const express=require("express");
const User=require("../../controller/User/user.controller");
const {authenticate}=require("../../middleware/Authentication");
const router = express.Router();

router.post("/userRegister",User.userRegisterCtrl);
router.post("/userLogin",User.userLoginCtrl);
router.get("/userProfile/:id",authenticate,User.getProfileCtrl);
router.get("/getAllUser",authenticate,User.getAllUsersCtrl);
router.put("/userUpdate/:id",User.updateUserInfoCtrl);
router.delete("/deleteUser/:id",User.deleteUserCtrl);
router.patch("/updateUserStatus/:id",User.updateUserStatusCtrl);

router.post("/followUser/:id",authenticate,User.followUser);
router.post("/unFollowUser",authenticate,User.unFollowUser);

module.exports = router;