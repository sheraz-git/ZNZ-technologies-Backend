const coursesModel = require("../model/courses.model");
const cloudinary = require("../connections/cloudinary");
const { StatusCodes } = require("http-status-codes");

exports.uploadVideoCtrl = async (req, res) => {
    try {
        const file1=req.file;
        const result = await cloudinary.uploader.upload(req.file.path,{resource_type:"video"});
        res
      .status(StatusCodes.CREATED)
      .json({ message: "Upload Video Successfully", data: result.secure_url});
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }
  };
  
exports.coursesRegisterCtrl = async (req, res) => {
  try {
    const{userId}=req.params; 
    const {courseImage,courseTitle,description,details,courseOverview} = req.body;
    const newCourses = await coursesModel.create({
      courseImage,
      courseTitle,
      description,
      details,
      courseOverview,
      userId
    });
    res
    .status(StatusCodes.CREATED)
    .json({ message: "Course Upload Successfully", data: newCourses });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getCourseCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const course = await coursesModel.findById(id)
    res
    .status(StatusCodes.OK)
    .json({ message: "course fetch Successfully", data: course });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.getAllCoursesCtrl = async (req, res) => {
  try {
    res
    .status(StatusCodes.OK)
    .json({ message: "fetch All Courses Successfully", data: res.results  });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.updateCoursesInfoCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const course = await coursesModel.findById(id);
      course.set(req.body);
      const updatedCourse = await course.save();
      res
      .status(StatusCodes.OK)
      .json({ message: "Course Update Successfully", data: updatedCourse });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

exports.deleteCourseCtrl = async (req, res) => {
  try {
    const {id} = req.params;
    const course = await coursesModel.findById(id);
      await coursesModel.findByIdAndDelete(course);
      res
      .status(StatusCodes.OK)
      .json({ message: "Course-deleted", data:  "Success" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
