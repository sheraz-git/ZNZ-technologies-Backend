const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const sign = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY_IN,
  });
};
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    if (!token) {
      throw new NotFoundError("Token not found");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Attach the decoded token payload to the request object for use in routes
    req.decodedToken = decoded;
    next();
  } catch (err) {
    console.log("---",err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};
module.exports = {
  sign,
  authenticate,
};
