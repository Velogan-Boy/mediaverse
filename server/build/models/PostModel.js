"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var postSchema = _mongoose["default"].Schema({
  userid: {
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users',
    required: true
  },
  type: {
    type: String,
    "enum": ['text', 'image'],
    "default": 'text'
  },
  upvotes: {
    type: Number,
    "default": 0
  },
  comments: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Comments'
  }],
  caption: String,
  hashtags: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Hashtags'
  }],
  imageURL: String,
  location: String
}, {
  timestamps: true
});

var PostModel = _mongoose["default"].model('Posts', postSchema);

var _default = PostModel;
exports["default"] = _default;