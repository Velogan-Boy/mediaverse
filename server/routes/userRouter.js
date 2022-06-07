import express from 'express';

import checkAuth from '../helpers/checkAuth';
import {
   userSignIn,
   userSignUp,
   getUserById,
   searchUser,
   editUser,
   deleteUser,
   getAllUsers,
   followOrUnfollowUser,
   getAllFollowersOfAnUser,
   getAllFollowingsOfAnUser,
   removeFollower,
} from '../controllers/userControllers';

const router = express.Router();

router
   .get('/signin', checkAuth, userSignIn)
   .post('/signup', userSignUp)
   .get('/user/:userid', getUserById)
   .get('/search', searchUser)
   .patch('/', checkAuth, editUser)
   .delete('/', checkAuth, deleteUser)
   .get('/', getAllUsers)
   .get('/follow/:followingUserId', checkAuth, followOrUnfollowUser)
   .get('/followers', checkAuth, getAllFollowersOfAnUser)
   .get('/following', checkAuth, getAllFollowingsOfAnUser)
   .delete('/follower/:followerUserId', checkAuth, removeFollower);

export default router;
