"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _postControllers = require("../controllers/postControllers");

var _checkAuth = _interopRequireDefault(require("../helpers/checkAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/', _checkAuth["default"], _postControllers.getAllPostsOfAnUser).get('/user/:userid', _postControllers.getAllPostsOfAnUserByUserId).get('/feed', _checkAuth["default"], _postControllers.getUserFeed).get('/post/:postid', _postControllers.getPostByPostId).get('/trending', _postControllers.getTrendingPosts).post('/', _checkAuth["default"], _postControllers.createNewPost).patch('/post/:postid', _checkAuth["default"], _postControllers.updatePostByPostId).patch('/upvote/:postid', _checkAuth["default"], _postControllers.upvotePostAndRemoveUpvote)["delete"]('/post/:postid', _checkAuth["default"], _postControllers.deletePostByPostId);
var _default = router;
exports["default"] = _default;