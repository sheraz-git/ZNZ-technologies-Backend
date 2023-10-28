const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userLogoutCtrl,
  getProfileCtrl,
  getAllUsersCtrl,
  updateUserInfoCtrl,
  deleteUserCtrl,
  updateUserStatusCtrl,
} = require("../../controller/users/user.controller");
const { authenticate } = require("../../middleware/authentication");
const advanceResults = require("../../middleware/advanceResults");
const UserModel = require("../../model/users/user.model");
const {
  validateUserIdParams,
  validateRegisterInput,
  validateLoginInput,
} = require("../../validations/userValidations");
const router = express.Router();

router.post("/userRegister", validateRegisterInput, userRegisterCtrl);
router.post("/userLoginCtrl", validateLoginInput, userLoginCtrl);
router.post("/userLogoutCtrl", userLogoutCtrl);
router.get(
  "/userProfile/:id",
  authenticate,
  validateUserIdParams,
  getProfileCtrl
);
router.get(
  "/getAllUsersCtrl",
  authenticate,
  validateUserIdParams,
  advanceResults(UserModel),
  getAllUsersCtrl
);
router.put(
  "/updateUserInfoCtrl/:id",
  validateRegisterInput,
  authenticate,
  updateUserInfoCtrl
);
router.delete(
  "/deleteUserCtrl/:id",
  authenticate,
  validateUserIdParams,
  deleteUserCtrl
);
router.patch("/updateUserStatusCtrl/:id", updateUserStatusCtrl);

// router.post("/followUser/:id",authenticate,User.followUser);
// router.post("/unFollowUser",authenticate,User.unFollowUser);

module.exports = router;
