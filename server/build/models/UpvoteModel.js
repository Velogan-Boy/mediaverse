"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UpvoteSchema = _mongoose["default"].Schema({
  userid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users',
    required: true
  },
  postid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Posts',
    required: true
  }
}, {
  timestamps: true
});

var UpvoteModel = _mongoose["default"].model('Upvotes', UpvoteSchema);

var _default = UpvoteModel;
exports["default"] = _default;