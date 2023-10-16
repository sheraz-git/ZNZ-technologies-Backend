const express=require("express");
const Contact=require("../../controller/ContactUs/contact.controller");
const {authenticate}=require("../../middleware/Authentication");
const router = express.Router();

router.post("/ContactRegisterCtrl/:id",Contact.ContactRegisterCtrl);
router.get("/getContactCtrl/:id",authenticate,Contact.getContactCtrl);
router.get("/getAllContactCtrl",authenticate,Contact.getAllContactCtrl);
router.put("/updateContactInfoCtrl/:id",Contact.updateContactInfoCtrl);
router.delete("/deleteContactCtrl/:id",Contact.deleteContactCtrl);

module.exports = router;