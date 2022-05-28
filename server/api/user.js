import express from 'express';

import checkAuth from '../helpers/checkAuth';
import UserModel from '../models/UserModel';

const router = express.Router();

/**
 * Route        /user/signup
 * Des          Create new user
 * Params       none
 * Access       public
 * Method       POST
 **/

router.post('/signup', async (req, res) => {
   try {
      const { authid, username, fname, lname, email, phone, address, city, state, zip, country, latitude, longitude } = req.body;

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
         phone,
         address,
         city,
         state,
         zip,
         country,
         latitude,
         longitude,
      });

      return res.status(200).json({
         status: 'success',
         message: 'User created successfully',
         user: newUser,
      });
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Internal server error',
         error: err,
      });
   }
});

/**
 * Route        /user
 * Des          Get user details
 * Params       none
 * Access       public
 * Method       GET
 **/

router.get('/signin', async (req, res) => {
   try {
      const user = await checkAuth(req, res);

      res.status(200).json({
         status: 'success',
         message: 'User found',
         data: user,
      });
   } catch (err) {
      res.status(500).json({
         status: 'fail',
         message: 'Something went wrong',
         error: err,
      });
   }
});

/**
 * Route        /user
 * Des          Edit user details
 * Params       none
 * Access       public
 * Method       PATCH
 **/

router.patch('/', async (req, res) => {
   try {
      const user = await checkAuth(req, res);

      const { fname, lname, phone, address, city, state, zip, country, latitude, longitude } = req.body;

      const editedUser = await UserModel.findByIdAndUpdate(user._id, { fname, lname, phone, address, city, state, zip, country, latitude, longitude });

      return res.status(200).json({
         status: 'success',
         message: 'User data updated successfully',
         data: editedUser,
      });
   } catch (err) {
      res.status(500).json({ status: 'fail', message: 'Internal server error', error: err });
   }
});

/**
 * Route        /user/
 * Des          get all users
 * Params       none
 * Access       private
 * Method       GET
 **/

router.get('/', async (req, res) => {
   try {
      const users = await UserModel.find();

      if (users.length == 0)
         res.status(400).json({
            status: 'fail',
            message: 'No users found',
         });

      res.status(200).json({
         status: 'success',
         results: users.length,
         data: users,
      });
   } catch (err) {
      res.status(500).json({
         status: 'fail',
         message: 'Something went wrong',
         error: err,
      });
   }
});

export default router;
