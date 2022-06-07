"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = _mongoose["default"].Schema({
  authid: {
    type: String,
    required: true
  },
  // comes from firebase
  fname: String,
  lname: String,
  username: {
    type: String,
    required: true
  },
  email: String,
  latitude: Number,
  longitude: Number,
  profileImg: {
    type: String
  },
  upvotedPosts: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Posts'
  }],
  following: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users'
  }],
  followers: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: 'Users'
  }]
}, {
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (!this.profileImg) {
    this.profileImg = "https://ui-avatars.com/api/?name=".concat(this.fname, "+").concat(this.lname, "&length=2&rounded=true&bold=true&size=128&background=random");
  }

  next();
}); //deselect authid whenever we get the user details

userSchema.pre('get', function (next) {
  this.select('-__v');
  this.select('-authid');
  next();
});

var UserModel = _mongoose["default"].model('Users', userSchema);

var _default = UserModel;
exports["default"] = _default;