"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _checkAuth = _interopRequireDefault(require("../helpers/checkAuth"));

var _userControllers = require("../controllers/userControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/signin', _checkAuth["default"], _userControllers.userSignIn).post('/signup', _userControllers.userSignUp).get('/user/:userid', _userControllers.getUserById).get('/search', _userControllers.searchUser).patch('/', _checkAuth["default"], _userControllers.editUser)["delete"]('/', _checkAuth["default"], _userControllers.deleteUser).get('/', _userControllers.getAllUsers).get('/follow/:followingUserId', _checkAuth["default"], _userControllers.followOrUnfollowUser).get('/followers', _checkAuth["default"], _userControllers.getAllFollowersOfAnUser).get('/following', _checkAuth["default"], _userControllers.getAllFollowingsOfAnUser)["delete"]('/follower/:followerUserId', _checkAuth["default"], _userControllers.removeFollower);
var _default = router;
exports["default"] = _default;