"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var answerSchema = _mongoose["default"].Schema({
  userid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users'
  },
  answer: String
}, {
  timestamps: true
});

var AnswerModel = _mongoose["default"].model('Answers', answerSchema);

var _default = AnswerModel;
exports["default"] = _default;