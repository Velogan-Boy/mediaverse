const express = require('express');

const {
   getAllPostsOfAnUser,
   getAllPostsOfAnUserByUserId,
   getUserFeed,
   getPostByPostId,
   getTrendingPosts,
   createNewPost,
   updatePostByPostId,
   upvotePostAndRemoveUpvote,
   deletePostByPostId
} = require('../controllers/postControllers');

const checkAuth = require('../helpers/checkAuth');

const router = express.Router();

router.get('/', checkAuth, getAllPostsOfAnUser).get('/user/:userid', getAllPostsOfAnUserByUserId).get('/feed', checkAuth, getUserFeed).get('/post/:postid', getPostByPostId).get('/trending', getTrendingPosts).post('/', checkAuth, createNewPost).patch('/post/:postid', checkAuth, updatePostByPostId).patch('/upvote/:postid', checkAuth, upvotePostAndRemoveUpvote).delete('/post/:postid', checkAuth, deletePostByPostId);

module.exports = router;