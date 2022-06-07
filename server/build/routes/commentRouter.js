"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _checkAuth = _interopRequireDefault(require("../helpers/checkAuth"));

var _commentControllers = require("../controllers/commentControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/:postid', _commentControllers.getCommentsOfAPost).post('/post/:postid', _checkAuth["default"], _commentControllers.commentOnPost).post('/:commentid', _checkAuth["default"], _commentControllers.replyOnComment)["delete"]('/:postid/:commentid', _checkAuth["default"], _commentControllers.deleteCommentOfAPost);
var _default = router;
exports["default"] = _default;