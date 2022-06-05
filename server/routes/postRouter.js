import express from 'express';

import {
   getAllPostsOfAnUser,
   getUserFeed,
   getPostByPostId,
   getTrendingPosts,
   createNewPost,
   updatePostByPostId,
   upvotePostAndRemoveUpvote,
   deletePostByPostId,
} from '../controllers/postControllers';
import checkAuth from '../helpers/checkAuth';

const router = express.Router();

router
   .get('/', checkAuth, getAllPostsOfAnUser)
   .get('/feed', checkAuth, getUserFeed)
   .get('/post/:postid', getPostByPostId)
   .get('/trending', getTrendingPosts)
   .post('/', checkAuth, createNewPost)
   .patch('/post/:postid', checkAuth, updatePostByPostId)
   .patch('/upvote/:postid', checkAuth, upvotePostAndRemoveUpvote)
   .delete('/post/:postid', checkAuth, deletePostByPostId);

export default router;
