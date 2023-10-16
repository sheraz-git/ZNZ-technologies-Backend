const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Port = process.env.PORT || 5000;
const connectToMongo = require("./connections/connectDb");
const userRoute=require("./routes/Users/user.routes");
const contactRoute=require("./routes/ContactUs/contact.routes");
const postRoute=require("./routes/Post/post.route");
const commentRoute=require("./routes/Comments/comments.route");
const productRoute=require("./routes/Products/products.route");
connectToMongo();
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Znz-Worked-Successfully",
  });
});

app.listen(Port, () => {
  console.log(`Znz-Backend-Working ${Port}`);
});

app.use("/api",userRoute,postRoute,contactRoute,commentRoute,productRoute,(req, res, next) => {
    res.status(404).json({
       success: false,
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  }
);
