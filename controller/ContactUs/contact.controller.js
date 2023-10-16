const Contact = require("../../model/ContactUs/contact.model");
const { success, error } = require("../../helper/response");


exports.ContactRegisterCtrl = async (req, res) => {
  try {
    const{id}=req.params;
    console.log("🚀 ~ file: Contact.controller.js:8 ~ exports.postCtrl= ~ id:", id)
    const { name, email, subject } = req.body;
    const newContact = await Contact.create({
      name, email, subject,id
    });
    success("Contact Successful", {data:newContact}, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};


exports.getContactCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const Contact = await Contact.findById(id);
    Contact
      ? success("Contact", { data: Contact }, "OK", res)
      : error("ContactNotFound", "NOT_FOUND", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.getAllContactCtrl = async (req, res) => {
  try {
    const Contacts = await Contact.find({});
    success("Contacts", { data: Contacts }, "OK", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.updateContactInfoCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const Contact = await Contact.findById(id);
    if (Contact) {
      Contact.set(req.body);
      const updatedContact = await Contact.save();
      success("Contact", { data: updatedContact }, "OK", res);
    } else {
      error("ContactNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

exports.deleteContactCtrl = async (req, res) => {
  try {
    const id = req.params.id;
    const Contact = await Contact.findById(id);
    if (Contact) {
      await Contact.findByIdAndDelete(Contact);
      success("Contact-deleted", { data: Contact }, "OK", res);
    } else {
      error("ContactNotFound", "NOT_FOUND", res);
    }
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

