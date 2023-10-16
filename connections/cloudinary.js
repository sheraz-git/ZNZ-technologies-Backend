const cloudinary=require("cloudinary").v2
require("dotenv").config();

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.ClOUD_API_KEY,
    api_secret:process.env.ClOUD_SECREAT_KEY,  
})
module.exports = cloudinary;