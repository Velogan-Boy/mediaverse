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
 * Route        /following
 * Des          Get all following users of an user
 * Params       none
 * Access       private
 * Method       GET
 **/

router.get('/following', checkAuth, async (req, res) => {
   try {
      const user = req.user;

      const followers = await FollowerModel.findOne({
         userId: user._id,
      }).populate('followingId');

      if (!followers) {
         return res.status(200).json({
            status: 'success',
            results: 0,
            data: [],
         });
      }

      res.status(200).json({
         status: 'success',
         results: followers.followingId.length,
         data: followers.followingId,
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

// router.post('/:id', checkAuth, async (req, res) => {
//    try {
//       const followerId = req.user._id;
//       const followedId = req.params.id;

//       if (JSON.stringify(followedId) === JSON.stringify(followerId)) {
//          return res.status(400).json({
//             status: 'fail',
//             message: 'You cannot follow yourself',
//          });
//       }

//       const follower = await FollowerModel.findOne({
//          userId: followerId, // logesh
//       });

//       const followed = await FollowerModel.findOne({
//          userId: followedId, //velan
//       });

//       if (!follower.followingId.includes(followedId) && !followed.followerId.includes(followerId)) {
//          // Follow user
//          const updatedFollower = await FollowerModel.findOneAndUpdate(
//             { userId: followedId },
//             {
//                $push: {
//                   followerId: followerId,
//                },
//             },
//             { new: true }
//          );

//          return res.status(200).json({
//             status: 'success',
//             message: `@${req.user.username} followed given user`,
//             data: updatedFollower,
//          });
//       } else {
//          // Unfollow user
//          const updatedFollower = await FollowerModel.findOneAndUpdate(
//             { userId: followedId },
//             {
//                $pull: {
//                   followerId: followerId,
//                },
//             },
//             { new: true }
//          );

//          return res.status(200).json({
//             status: 'success',
//             message: `User @${req.user.username} unfollowed given user `,
//             data: updatedFollower,
//          });
//       }
//    } catch (err) {
//       res.status(500).json({
//          status: 'fail',
//          message: 'Internal server error',
//          error: err,
//       });
//    }
// });

// /**
//  * Route        /followers/location
//  * Des          get all socialmates
//  * Params       none
//  * Access       private
//  * Method       GET
//  **/

// router.get('/location', checkAuth, async (req, res) => {
//    try {
//       const user = req.user;

//       const buddies = await FollowerModel.find({
//          userid: user._id,
//       }).populate('followerId');

//       if (!buddies) {
//          res.status(404).json({
//             status: 'fail',
//             results: 0,
//             message: 'User not found',
//          });
//       }

//       res.status(200).json({
//          status: 'fail',
//          message: 'Buddies found successfully',
//          results: buddies.followerId.length,
//          data: buddies.followerId,
//       });
//    } catch (err) {
//       res.status(500).json({
//          status: 'success',
//          message: 'Internal Server error',
//       });
//    }
// });

export default router;
