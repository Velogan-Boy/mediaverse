import express from 'express';
import checkAuth from '../helpers/checkAuth';

import { CommentModel, PostModel, UserModel } from '../models';

const router = express.Router();

/**
 * Route        /posts/:postid/comments
 * Des          Get Comments of a Post
 * Params       none
 * Access       public
 * Method       GET
 **/

router.get('/:postid', async (req, res) => {
   try {
      const postid = req.params.postid;

      const post = await PostModel.findById(postid).populate({
         path: 'comments',
         populate: {
            path: 'replies',
         },
      });

      return res.status(200).json({
         status: 'success',
         result: post.comments.length,
         data: post.comments,
      });
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went wrong',
         error: err,
      });
   }
});

/**
 * Route        /comments/post/:postid
 * Des          Post a comments on a post
 * Params       postid
 * Access       private
 * Method       POST
 **/

router.post('/post/:postid', checkAuth, async (req, res) => {
   try {
      const postid = req.params.postid;
      const user = req.user;
      const comment = req.body.comment;

      const createdComment = await CommentModel.create({
         userid: user._id,
         comment: comment,
      });

      const post = await PostModel.findById(postid);

      post.comments.push(createdComment._id);
      post.save();

      return res.status(200).json({
         status: 'success',
         message: 'Comment posted successfully',
         data: post,
      });
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went wrong',
         error: err,
      });
   }
});

/**
 * Route        /comments/:commentid
 * Des          Create a comments on a post
 * Params       commentid
 * Access       private
 * Method       POST
 **/

router.post('/:commentid', checkAuth, async (req, res) => {
   try {
      const commentid = req.params.commentid;
      const user = req.user;
      const comment = req.body.comment;

      const createdComment = await CommentModel.create({
         userid: user._id,
         comment: comment,
      });

      const commentToUpdate = await CommentModel.findById(commentid);

      if (!commentToUpdate) {
         return res.status(404).json({
            status: 'fail',
            message: 'Comment not found',
         });
      }

      commentToUpdate.replies.push(createdComment._id);
      commentToUpdate.save();

      return res.status(200).json({
         status: 'success',
         message: 'Comment posted successfully',
         data: commentToUpdate,
      });
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Something went wrong',
         error: err,
      });
   }
});

/**
 * Route        comments/:postid/:commentid
 * Des          Delete a comment on post
 * Params       postid,commentid
 * Access       private
 * Method       DELETE
 **/

router.delete('/:postid/:commentid', checkAuth, async (req, res) => {
   try {
      const { postid, commentid } = req.params;
      const user = req.user;

      const post = await PostModel.findById(postid);

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      const comment = await CommentModel.findById(commentid);

      if (!comment) {
         return res.status(404).json({
            status: 'fail',
            message: 'Comment not found',
         });
      }

      if (JSON.stringify(comment.userid) !== JSON.stringify(user._id) && JSON.stringify(post.userid) !== JSON.stringify(user._id)) {
         return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized',
         });
      }

      const updatedPost = await PostModel.findByIdAndUpdate(postid, {
         comments: post.comments.filter((comment) => comment._id !== commentid),
      });

      const deletedComment = await CommentModel.findOneAndDelete({ _id: commentid });

      return res.status(200).json({
         status: 'success',
         message: 'Comment deleted successfully',
         data: updatedPost,
      });
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Internal server error',
         error: err,
      });
   }
});

export default router;
