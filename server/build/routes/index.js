"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "commentRouter", {
  enumerable: true,
  get: function get() {
    return _commentRouter["default"];
  }
});
Object.defineProperty(exports, "discussionRouter", {
  enumerable: true,
  get: function get() {
    return _discussionRouter["default"];
  }
});
Object.defineProperty(exports, "postRouter", {
  enumerable: true,
  get: function get() {
    return _postRouter["default"];
  }
});
Object.defineProperty(exports, "userRouter", {
  enumerable: true,
  get: function get() {
    return _userRouter["default"];
  }
});

var _userRouter = _interopRequireDefault(require("./userRouter"));

var _postRouter = _interopRequireDefault(require("./postRouter"));

var _commentRouter = _interopRequireDefault(require("./commentRouter"));

var _discussionRouter = _interopRequireDefault(require("./discussionRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }