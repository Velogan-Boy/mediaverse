const checkAuth = require('../helpers/checkAuth');
const { CommentModel, PostModel, UserModel } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getCommentsOfAPost = catchAsync(async (req, res) => {
   const postid = req.params.postid;

   const post = await PostModel.findById(postid).populate({
      path: 'comments',
      populate: {
         path: 'replies',
      },
   });

   if (!post) {
      return res.status(404).json({
         status: 'fail',
         message: 'Post not found',
      });
   }

   const comments = JSON.parse(JSON.stringify(post.comments));

   for (const comment of comments) {
      const user = await UserModel.findById(comment.userid).select('username profileImg');
      comment.postedUser = user;
   }

   return res.status(200).json({
      status: 'success',
      result: comments.length,
      data: comments,
   });
});

exports.commentOnPost = catchAsync(async (req, res) => {
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
});

exports.replyOnComment = catchAsync(async (req, res) => {
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
});

exports.deleteCommentOfAPost = catchAsync(async (req, res) => {
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
      data: deletedComment,
   });
});
