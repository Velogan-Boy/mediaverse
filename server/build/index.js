"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('@babel/core').transform('code', {
  presets: ['@babel/preset-env']
});

_dotenv["default"].config();

var app = (0, _express["default"])(); // MIDDLEWARES

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use((0, _helmet["default"])());
app.use('/page', _express["default"]["static"]('static'));

if (process.env.NODE_ENV == 'development ') {
  app.use((0, _morgan["default"])('dev'));
} // ROUTES


app.use('/users', _routes.userRouter);
app.use('/posts', _routes.postRouter);
app.use('/comments', _routes.commentRouter);
app.use('/discussions', _routes.discussionRouter); // SERVER

var port = process.env.PORT || 8000;
app.listen(port, function () {
  console.log("\u2705 Server is running on port ".concat(port, " !!!"));
});

_mongoose["default"].connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  if (err) console.log(err);else console.log('✅ MongoDB connection successfull !!!');
});