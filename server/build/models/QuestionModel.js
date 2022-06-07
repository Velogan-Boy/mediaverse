"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var questionSchema = _mongoose["default"].Schema({
  userid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users'
  },
  topic: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Topics'
  },
  question: String,
  description: String,
  answers: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Answers'
  }]
}, {
  timestamps: true
});

var questionModel = _mongoose["default"].model('Questions', questionSchema);

var _default = questionModel;
exports["default"] = _default;