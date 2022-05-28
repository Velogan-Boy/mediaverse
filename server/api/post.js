import express from 'express';
import checkAuth from '../helpers/checkAuth';

import { UserModel, PostModel, HashtagModel } from '../models';

const router = express.Router();

/**
 * Route        /post
 * Des          Get all posts by userid
 * Params       none
 * Access       public
 * Method       GET
 **/

router.get('/', async (req, res) => {
   try {
      const user = await checkAuth(req, res);

      const posts = await PostModel.find({ userid: user._id }).populate('hashtags');

      if (posts.length === 0) {
         return res.status(404).json({
            status: 'fail',
            message: 'Posts not found',
         });
      }

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
 * Route        /post
 * Des          Create new post
 * Params       none
 * Access       public
 * Method       POST
 **/

router.post('/', async (req, res) => {
   try {
      const user = await checkAuth(req, res);

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
 * Route        /post
 * Des          Edit post
 * Params       none
 * Access       public
 * Method       PUT
 **/

router.patch('/:postid', async (req, res) => {
   try {
      const { postid } = req.params;
      const { authorization: authid } = req.headers;
      const { type, content, location } = req.body;

      const user = await UserModel.findOne({ userid: authid });

      if (!user) {
         return res.status(404).json({
            status: 'fail',
            message: 'User not found',
         });
      }

      const post = await PostModel.findOne({ _id: postid });

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      // if (post.userid !== user._id) {
      //    return res.status(401).json({
      //       status: 'fail',
      //       message: 'Unauthorized',
      //    });
      // }

      const updatedPost = await PostModel.findOneAndUpdate(
         { _id: postid },
         {
            type,
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
 * Route        /post/trending
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

         posts.push(trendingPost);
      }
      
      res.status(200).json({
         status:'success',
         result: posts.length,
         data: posts
      })
      
      
   } catch (err) {
      return res.status(500).json({
         status: 'fail',
         message: 'Internal server error',
         error: err,
      });
   }
});

/**
 * Route        /post
 * Des          Delete post
 * Params       none
 * Access       public
 * Method       POST
 **/

router.delete('/:postid', async (req, res) => {
   try {
      const { authorization: authid } = req.headers;

      if (!authid) {
         return res.status(401).json({
            status: 'fail',
            message: 'Unauthorized',
         });
      }

      const { postid } = req.params;

      const user = await UserModel.findOne({ userid: authid });

      if (!user) {
         return res.status(404).json({
            status: 'fail',
            message: 'User not found',
         });
      }

      const post = await PostModel.findOne({ _id: postid });

      if (!post) {
         return res.status(404).json({
            status: 'fail',
            message: 'Post not found',
         });
      }

      // console.log(user._id);
      // console.log(post.userid);

      // if (post.userid !== user._id) {
      //    return res.status(401).json({
      //       status: 'fail',
      //       message: 'Unauthorized',
      //    });
      // }

      const deletedPost = await PostModel.findOneAndDelete({ _id: postid });

      return res.status(200).json({
         status: 'success',
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
