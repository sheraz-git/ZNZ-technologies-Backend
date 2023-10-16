const jwt = require("jsonwebtoken");
require("dotenv").config();
const SecretKey = process.env.SECRET_KEY;

const sign = (payload) => {
  return jwt.sign(payload, SecretKey);
};

const authenticate = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }
    const decoded = jwt.verify(token, SecretKey);
    
    // Attach the decoded token payload to the request object for use in routes
    req.decodedToken = decoded;

    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = {
  sign,
  authenticate,
};