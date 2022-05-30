import express from 'express';
import checkAuth from '../helpers/checkAuth';
import { FollowerModel } from '../models';

const router = express.Router();

/**
 * Route        /followers
 * Des          Get all followers of an user
 * Params       none
 * Access       private
 * Method       GET
 **/

router.get('/', checkAuth, async (req, res) => {
   try {
      const user = req.user;

      const followers = await FollowerModel.findOne({
         userId: user._id,
      }).populate('followerId');

      if (!followers) {
         return res.status(200).json({
            status: 'success',
            results: 0,
            data: [],
         });
      }

      res.status(200).json({
         status: 'success',
         results: followers.followerId.length,
         data: followers.followerId,
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
 * Route        /followers/:id
 * Des          Follow/Unfollow an user
 * Params       none
 * Access       private
 * Method       POST
 **/

router.post('/:id', checkAuth, async (req, res) => {
   try {
      const followerId = req.user._id;
      const followedId = req.params.id;

      if (JSON.stringify(followedId) === JSON.stringify(followerId)) {
         return res.status(400).json({
            status: 'fail',
            message: 'You cannot follow yourself',
         });
      }

      const followers = await FollowerModel.findOne({
         userId: followedId,
      });

      if (!followers) {
         const newFollower = await FollowerModel.create({
            userId: followedId,
            followerId: followerId,
         });

         return res.status(201).json({
            status: 'success',
            data: newFollower,
         });
      }

      if (!followers.followerId.includes(followerId)) {
         // Follow user
         const updatedFollower = await FollowerModel.findOneAndUpdate(
            { userId: followedId },
            {
               $push: {
                  followerId: followerId,
               },
            },
            { new: true }
         );

         return res.status(200).json({
            status: 'success',
            message: `@${req.user.username} followed given user`,
            data: updatedFollower,
         });
      } else {
         // Unfollow user
         const updatedFollower = await FollowerModel.findOneAndUpdate(
            { userId: followedId },
            {
               $pull: {
                  followerId: followerId,
               },
            },
            { new: true }
         );

         return res.status(200).json({
            status: 'success',
            message: `User @${req.user.username} unfollowed given user `,
            data: updatedFollower,
         });
      }
   } catch (err) {
      res.status(500).json({
         status: 'fail',
         message: 'Internal server error',
         error: err,
      });
   }
});

export default router;
