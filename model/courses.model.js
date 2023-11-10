const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    courseImage: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    courseOverview: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Course = mongoose.model("Course", courseSchema);
module.exports = Course;