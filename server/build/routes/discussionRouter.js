"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _checkAuth = _interopRequireDefault(require("../helpers/checkAuth"));

var _discussionControllers = require("../controllers/discussionControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/questions/topic/:topicId', _discussionControllers.getAllQuestionBasedOnTopic).get('/questions/trending', _discussionControllers.getTrendingQuestions).get('/topic/search', _discussionControllers.searchTopic).get('/questions/:questionid', _discussionControllers.getQuestionByQId).get('/topic/trending', _discussionControllers.getTrendingTopics).post('/questions', _checkAuth["default"], _discussionControllers.postQuestion).post('/questions/answer/:questionid', _checkAuth["default"], _discussionControllers.postAnswer);
var _default = router;
exports["default"] = _default;