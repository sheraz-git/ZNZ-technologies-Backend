const express = require("express");
const {
  ContactRegisterCtrl,
  getContactCtrl,
  getAllContactCtrl,
  deleteContactCtrl,
} = require("../../controller/contact/contact.controller");
const { authenticate } = require("../../middleware/authentication");
const contactModel = require("../../model/contact/contact.model");
const advanceResults = require("../../middleware/advanceResults");
const router = express.Router();

router.post("/ContactRegisterCtrl", ContactRegisterCtrl);
router.get("/getContactCtrl/:id", authenticate, getContactCtrl);
router.get(
  "/getAllContactCtrl",
  authenticate,
  advanceResults(contactModel),
  getAllContactCtrl
);
router.delete("/deleteContactCtrl/:id", deleteContactCtrl);

module.exports = router;
