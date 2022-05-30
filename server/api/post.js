import express from 'express';
import checkAuth from '../helpers/checkAuth';

import { UserModel, PostModel, HashtagModel, UpvoteModel, CommentModel } from '../models';

const router = express.Router();

/**
 * Route        /posts
 * Des          Get all posts of an user
 * Params       none
 * Access       private
 * Method       GET
 **/

router.get('/', checkAuth, async (req, res) => {
   try {
      const user = req.user;

      const posts = await PostModel.find({ userid: user._id }).populate({
         path: 'comments hashtags',
         populate: {
            path: 'replies',
            model: 'Comments',
         },
      });

      return res.status(200).json({
         status: 'success',
         results: posts.length,
         data: posts,
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
 * Route        /posts/global-trending
 * Des          Get global trends
 * Params       none
 * Access       public
 * Method       GET
 **/

router.get('/global-trending', async (req, res) => {
   try {
      const posts = await PostModel.find().populate('hashtags userid comments').sort('-createdAt').limit(15);

      return res.status(200).json({
         status: 'success',
         results: posts.length,
         data: posts,
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
 * Route        /posts/:id
 * Des          Get post of any user
 * Params       id
 * Access       public
 * Method       GET
 **/

router.get('/post/:postid', async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.postid).populate('hashtags comments');

      return res.status(200).json({
         status: 'success',
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
 * Route        /posts/trending
 * Des          Get Trending post
 * Params       none
 * Access       public
 * Method       GET
 **/

router.get('/trending', async (req, res) => {
   try {
      const trendingHashtags = await HashtagModel.find().sort('-count').limit(10);

      let posts = new Array();

      for (const item of trendingHashtags) {
         const trendingPost = await PostModel.find({ hashtags: { $in: item._id } })
            .sort('-upvotes')
            .limit(1);

         posts.push({ hashtag: item, post: trendingPost });
      }

      res.status(200).json({
         status: 'success',
         result: posts.length,
         data: posts,
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
 * Route        /posts
 * Des          Create new post
 * Params       none
 * Access       private
 * Method       POST
 **/

router.post('/', checkAuth, async (req, res) => {
   try {
      const user = req.user;

      const { type, caption, imageURL, location, hashtags: _hashtags } = req.body;

      let hashtags = [..._hashtags];

      let hashtagIds = new Array();

      // removing # sign in each hashtags
      hashtags = hashtags.map((hashtag) => hashtag.slice(1));

      for (const hashtagName of hashtags) {
         // check whether each hashtag is in hashtag collection
         const existingHashtag = await HashtagModel.find({
            name: {
               $regex: new RegExp(hashtagName, 'i'),
            },
         });

         // if its there do count++;
         if (existingHashtag.length != 0) {
            const updatedHashtag = await HashtagModel.findOneAndUpdate(
               {
                  name: {
                     $regex: new RegExp(hashtagName, 'i'),
                  },
               },
               { count: 1 }
            );

            hashtagIds.push(updatedHashtag._id);
         } else {
            // if its not add that hastag and make count = 1;
            const createdHashtag = await HashtagModel.create({
               name: hashtagName,
               count: 1,
            });

            hashtagIds.push(createdHashtag._id);
         }
      }

      const post = await PostModel.create({
         userid: user._id,
         type,
         caption,
         imageURL,
         location,
         hashtags: hashtagIds,
      });

      return res.status(201).json({
         status: 'success',
         data: post,
      });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
   }
});

/**
 * Route        /post/:postid
 * Des          Edit post
 * Params       postid
 * Access       private
 * Method       PATCH
 **/

router.patch('/post/:postid', checkAuth, async (req, res) => {
   try {
      const { postid } = req.params;
      const { content, location } = req.body;
      const user = req.user;

      const post = await PostModel.findOne({ _id: postid });

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      if (post.userid === JSON.stringify(user._id)) {
         return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized',
         });
      }

      const updatedPost = await PostModel.findOneAndUpdate(
         { _id: postid },
         {
            content,
            location,
         }
      );

      return res.status(200).json({
         status: 'success',
         data: updatedPost,
      });
   } catch (err) {
      res.status(500).json({ status: 'fail', message: 'Internal server error', error: err });
   }
});

/**
 * Route        /post/:postid/upvote
 * Des          Upvote post
 * Params       postid
 * Access       private
 * Method       PATCH
 **/
router.patch('/:postid/upvote', checkAuth, async (req, res) => {
   try {
      const user = req.user;
      const postid = req.params.postid;

      const post = await PostModel.findOne({ _id: postid });

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      const isAlreadyUpvoted = await UpvoteModel.findOne({
         userid: user._id,
         postid: post._id,
      });

      if (!isAlreadyUpvoted) {
         await PostModel.findOneAndUpdate(
            { _id: postid },
            {
               upvotes: post.upvotes + 1,
            }
         );

         await UpvoteModel.create({
            userid: user._id,
            postid: post._id,
         });

         return res.status(200).json({
            status: 'success',
            message: `Post Upvoted by user @${user.username}`,
         });
      } else {
         await PostModel.findByIdAndUpdate(postid, {
            upvotes: post.upvotes - 1,
         });

         await UpvoteModel.findOneAndDelete({
            userid: user._id,
            postid: post._id,
         });

         return res.status(200).json({
            status: 'success',
            message: `Post Upvote removed by user @${user.username}`,
         });
      }
   } catch (err) {
      res.status(500).json({ status: 'fail', message: 'Internal server error', error: err });
   }
});

/**
 * Route        posts/post/:postid
 * Des          Delete post
 * Params       postid
 * Access       private
 * Method       POST
 **/

router.delete('/post/:postid', checkAuth, async (req, res) => {
   try {
      const { postid } = req.params;
      const user = req.user;

      const post = await PostModel.findById(postid);

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      if (JSON.stringify(post.userid) !== JSON.stringify(user._id)) {
         return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized',
         });
      }

      const deletedPost = await PostModel.findOneAndDelete({ _id: postid });

      return res.status(200).json({
         status: 'success',
         message: 'Post deleted successfully',
         data: deletedPost,
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
