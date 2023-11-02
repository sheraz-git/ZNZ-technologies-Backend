const contactModel = require("../../model/contact/contact.model");
const { StatusCodes } = require("http-status-codes");

exports.ContactRegisterCtrl = async (req, res) => {
  try {
    const { name, email, subject, detail } = req.body;
    const newContact = await contactModel.create({
      name,email,subject,detail
    });
    res.status(StatusCodes.CREATED).json({message:"Contact Successful",data:newContact})
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
};
exports.getContactCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const uniqueContact = await contactModel.findById(id);
    res.status(StatusCodes.OK).json({message:"fetch unique Contact successfully",data:uniqueContact})
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
};
exports.getAllContactCtrl = async (req, res) => {
  try {
    res
    .status(StatusCodes.OK)
    .json({ message: "fetch All Contact Successfully", data: res.results  });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.deleteContactCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const Contact = await contactModel.findById(id);
      await Contact.findByIdAndDelete(Contact);
      res
      .status(StatusCodes.OK)
      .json({ message: "Contact-deleted", data: "success"  });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

