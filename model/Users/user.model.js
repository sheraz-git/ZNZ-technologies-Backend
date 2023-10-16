const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minLength:6
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    profilePicture: {
      type: String,
      required: false,
      default: "",
    },
    coverPicture: {
      type: String,
      required: false,
      default: "",
    },
    fireBaseId: {
      type: String,
      required: false,
      default: ""
    },
    followers:{
      type: mongoose.Schema.Types.Array,
      ref: "User",
      default:[]  
    },
    following: {
      type: mongoose.Schema.Types.Array,
      ref: "User",
      default:[]  
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const user = mongoose.model("User", userSchema);
module.exports = user;
