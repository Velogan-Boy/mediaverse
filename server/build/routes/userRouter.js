const express = require('express');

const checkAuth = require('../helpers/checkAuth');
const {
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
   removeFollower
} = require('../controllers/userControllers');

const router = express.Router();

router.get('/signin', checkAuth, userSignIn).post('/signup', userSignUp).get('/user/:userid', getUserById).get('/search', searchUser).patch('/', checkAuth, editUser).delete('/', checkAuth, deleteUser).get('/', getAllUsers).get('/follow/:followingUserId', checkAuth, followOrUnfollowUser).get('/followers', checkAuth, getAllFollowersOfAnUser).get('/following', checkAuth, getAllFollowingsOfAnUser).delete('/follower/:followerUserId', checkAuth, removeFollower);

module.exports = router;