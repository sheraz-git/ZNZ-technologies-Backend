const express = require("express");
const expressAsyncErrors = require("express-async-errors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const GlobalErrorHandler = require("./middleware/globalErrorHandler");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const Port = process.env.PORT || 5000;
const connectToMongo = require("./connections/connectDb");
const userRoute = require("./routes/users/user.routes");
const postRoute = require("./routes/posts/post.route");
const shareRoute = require("./routes/share/share.routes");
const commentRoute = require("./routes/comments/comments.route");
const courseRoute = require("./routes/courses/courses.routes");
const productRoute = require("./routes/products/products.route");
const storiesRoute = require("./routes/stories/stories.route");
const contactRoute = require("./routes/contact/contact.routes");
connectToMongo();
app.use(GlobalErrorHandler);
app.use(cookieParser());
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Z-Rush Worked Successfully",
  });
});

app.listen(Port, () => {
  console.log(`Z-Rush Worked Fine at ${Port}`);
});
app.use(
  "/api",
  userRoute,
  postRoute,
  shareRoute,
  commentRoute,
  courseRoute,
  productRoute,
  storiesRoute,
  contactRoute,
  (req, res, next) => {
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
