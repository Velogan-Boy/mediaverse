"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentSchema = _mongoose["default"].Schema({
  userid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users'
  },
  comment: String,
  replies: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Comments'
  }]
}, {
  timestamps: true
});

var CommentModel = _mongoose["default"].model('Comments', commentSchema);

var _default = CommentModel;
exports["default"] = _default;