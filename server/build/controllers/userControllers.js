const checkAuth = require('../helpers/checkAuth');
const { CommentModel, PostModel, UserModel } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.userSignUp = catchAsync(async (req, res, next) => {
   const { authid, username, fname, lname, email, latitude, longitude, profileImg } = req.body;

   const existingUser = await UserModel.findOne({ email });

   if (existingUser) {
      return res.status(400).json({
         status: 'fail',
         message: 'User already exists'
      });
   }

   const newUser = await UserModel.create({
      authid,
      username,
      fname,
      lname,
      email,
      latitude,
      longitude,
      profileImg
   });

   return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      user: newUser
   });
});

exports.userSignIn = catchAsync(async (req, res) => {
   const user = req.user;

   res.status(200).json({
      status: 'success',
      message: 'User found',
      data: user
   });
});

exports.getUserById = catchAsync(async (req, res) => {
   const user = await UserModel.findById(req.params.userid);

   if (!user) {
      return res.status(404).json({
         status: 'fail',
         message: 'User not found'
      });
   }

   res.status(200).json({
      status: 'success',
      message: 'User found',
      data: user
   });
});

exports.searchUser = catchAsync(async (req, res) => {
   const searchString = req.query.searchString;

   const users = await UserModel.find({
      username: {
         $regex: searchString,
         $options: 'i'
      }
   });

   if (!users) {
      res.status(404).json({
         status: 'fail',
         message: 'Users not found',
         results: 0
      });
   }

   res.status(200).json({
      status: 'success',
      message: 'Users searched successfully',
      results: users.length,
      data: users
   });
});

exports.editUser = catchAsync(async (req, res, next) => {
   const user = req.user;

   const { fname, lname, profileImg } = req.body;

   const editedUser = await UserModel.findByIdAndUpdate(user._id, { fname, lname, profileImg }, { new: true });

   return res.status(200).json({
      status: 'success',
      message: 'User data updated successfully',
      data: editedUser
   });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
   const user = req.user;

   const deletedUser = await UserModel.findByIdAndRemove(user._id);

   // TODO - delete user's posts
   await PostModel.deleteMany({ userid: user._id });

   // TODO - delete user's id from all followers and following
   await UserModel.updateMany({ following: user._id }, { $pull: { following: user._id } });
   await UserModel.updateMany({ followers: user._id }, { $pull: { followers: user._id } });

   // TODO - delete user's comments
   await CommentModel.deleteMany({ userid: user._id });

   return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: deletedUser
   });
});

exports.getAllUsers = catchAsync(async (req, res) => {
   const users = await UserModel.find();

   res.status(200).json({
      status: 'success',
      results: users.length,
      data: users
   });
});

exports.followOrUnfollowUser = catchAsync(async (req, res) => {
   const user = req.user;

   const { followingUserId } = req.params;

   const followingUser = await UserModel.findById(followingUserId);

   if (!followingUser) {
      return res.status(404).json({
         status: 'fail',
         message: 'User not found'
      });
   }

   if (JSON.stringify(user._id) === JSON.stringify(followingUserId)) {
      return res.status(400).json({
         status: 'fail',
         message: 'You cannot follow yourself'
      });
   }

   const isAlreadyFollowed = user.following.includes(followingUserId);

   if (isAlreadyFollowed) {
      followingUser.followers.pull(user._id);
      user.following.pull(followingUserId);

      await followingUser.save();
      await user.save();

      return res.status(200).json({
         status: 'success',
         message: 'User unfollowed successfully',
         data: followingUser
      });
   } else {
      followingUser.followers.push(user._id);
      user.following.push(followingUser._id);

      await followingUser.save();
      await user.save();

      return res.status(200).json({
         status: 'success',
         message: 'User followed successfully',
         data: followingUser
      });
   }
});

exports.getAllFollowersOfAnUser = catchAsync(async (req, res) => {
   const user = req.user;

   const followers = await UserModel.find({
      _id: {
         $in: user.followers
      }
   });

   res.status(200).json({
      status: 'success',
      results: followers.length,
      data: followers
   });
});

exports.getAllFollowingsOfAnUser = catchAsync(async (req, res) => {
   const user = req.user;

   const following = await UserModel.find({
      _id: {
         $in: user.following
      }
   });

   res.status(200).json({
      status: 'success',
      results: following.length,
      data: following
   });
});

exports.removeFollower = catchAsync(async (req, res) => {
   const user = req.user;

   const { followerUserId } = req.params;

   const followerUser = await UserModel.findById(followerUserId);

   if (!followerUser) {
      return res.status(404).json({
         status: 'fail',
         message: 'User not found'
      });
   }

   await UserModel.updateOne({ _id: user._id }, { $pull: { followers: followerUserId } });
   const updatedFollower = await UserModel.updateOne({ _id: followerUserId }, { $pull: { following: user._id } }, { new: true });

   return res.status(200).json({
      status: 'success',
      message: 'Follower removed successfully',
      data: updatedFollower
   });
});