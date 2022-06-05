import checkAuth from '../helpers/checkAuth';
import UserModel from '../models/UserModel';
import catchAsync from '../utils/catchAsync';

export const userSignUp = catchAsync(async (req, res, next) => {
   const { authid, username, fname, lname, email, latitude, longitude, profileImg } = req.body;

   const existingUser = await UserModel.findOne({ email });

   if (existingUser) {
      return res.status(400).json({
         status: 'fail',
         message: 'User already exists',
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
      profileImg,
   });

   return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      user: newUser,
   });
});

export const userSignIn = catchAsync(async (req, res) => {
   const user = req.user;

   res.status(200).json({
      status: 'success',
      message: 'User found',
      data: user,
   });
});

export const searchUser = catchAsync(async (req, res, next) => {
   const searchString = req.query.searchString;

   const users = await UserModel.find({
      username: {
         $regex: searchString,
         $options: 'i',
      },
   });

   if (!users) {
      res.status(404).json({
         status: 'fail',
         message: 'Users not found',
         results: 0,
      });
   }

   res.status(200).json({
      status: 'success',
      message: 'Users searched successfully',
      results: users.length,
      data: users,
   });
});

export const editUser = catchAsync(async (req, res, next) => {
   const user = req.user;

   const { fname, lname, latitude, longitude, profileImg } = req.body;

   const editedUser = await UserModel.findByIdAndUpdate(user._id, { fname, lname, latitude, longitude, profileImg }, { new: true });

   return res.status(200).json({
      status: 'success',
      message: 'User data updated successfully',
      data: editedUser,
   });
});

export const deleteUser = catchAsync(async (req, res, next) => {
   const user = req.user;

   const deletedUser = await UserModel.findByIdAndRemove(user._id);

   // TODO - delete user's posts

   // TODO - delete user's comments

   return res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
      data: deletedUser,
   });
});

export const getAllUsers = catchAsync(async (req, res) => {
   const users = await UserModel.find();

   res.status(200).json({
      status: 'success',
      results: users.length,
      data: users,
   });
});

