const catchAsync = require('../utils/catchAsync');
const checkAuth = require('../helpers/checkAuth');
const { UserModel, PostModel, HashtagModel, UpvoteModel, CommentModel } = require('../models');

exports. getAllPostsOfAnUser = catchAsync(async (req, res) => {
   const user = req.user;

   const posts = await PostModel.find({ userid: user._id });

   return res.status(200).json({
      status: 'success',
      results: posts.length,
      data: posts,
   });
});

exports. getAllPostsOfAnUserByUserId = catchAsync(async (req, res) => {
   const user = await UserModel.findById(req.params.userid);

   if (!user) {
      return res.status(404).json({
         status: 'fail',
         message: 'User not found',
      });
   }

   const posts = await PostModel.find({ userid: user._id });

   return res.status(200).json({
      status: 'success',
      results: posts.length,
      data: posts,
   });
});

exports. getUserFeed = catchAsync(async (req, res) => {
   const user = req.user;

   let posts = await PostModel.find()
      .sort('-createdAt')
      .populate({
         path: 'userid',
         select: ['username', 'profileImg'],
      })
      .limit(15);

   let data = new Array();
   let isUpvoted;

   // check whether the user has upvoted the post or not
   posts.forEach((post) => {
      if (user.upvotedPosts.includes(post._id)) {
         isUpvoted = true;
      } else {
         isUpvoted = false;
      }

      let clone = JSON.parse(JSON.stringify(post));

      clone.isUpvoted = isUpvoted;

      data.push(clone);
   });

   return res.status(200).json({
      status: 'success',
      results: posts.length,
      data: data,
   });
});

exports. getPostByPostId = catchAsync(async (req, res) => {
   const post = await PostModel.findById(req.params.postid).populate('userid hashtags comments');

   return res.status(200).json({
      status: 'success',
      data: post,
   });
});

exports. getTrendingPosts = catchAsync(async (req, res) => {
   const trendingHashtags = await HashtagModel.find().sort('-count').limit(10);

   let posts = new Array();

   for (const item of trendingHashtags) {
      const trendingPost = await PostModel.find({ hashtags: { $in: item._id } })
         .sort('-upvotes')
         .populate('userid')
         .limit(1);

      posts.push({ hashtag: item, post: trendingPost });
   }

   res.status(200).json({
      status: 'success',
      result: posts.length,
      data: posts,
   });
});

exports. createNewPost = catchAsync(async (req, res) => {
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
      message: 'Post created successfully',
      data: post,
   });
});

exports. updatePostByPostId = catchAsync(async (req, res) => {
   const { postid } = req.params;
   const { caption, location } = req.body;
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
         caption,
         location,
      }
   );

   return res.status(200).json({
      status: 'success',
      data: updatedPost,
   });
});

exports. upvotePostAndRemoveUpvote = catchAsync(async (req, res) => {
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
      const updatedPost = await PostModel.findOneAndUpdate(
         { _id: postid },
         {
            upvotes: post.upvotes + 1,
         },
         { new: true }
      );

      await UpvoteModel.create({
         userid: user._id,
         postid: post._id,
      });

      UserModel.findById(user._id).then((user) => {
         user.upvotedPosts = [...user.upvotedPosts, post._id];
         user.save();
      });

      return res.status(200).json({
         status: 'success',
         message: `Post Upvoted by user @${user.username}`,
         data: updatedPost,
      });
   } else {
      const updatedPost = await PostModel.findByIdAndUpdate(
         postid,
         {
            upvotes: post.upvotes - 1,
         },
         { new: true }
      );

      await UpvoteModel.findOneAndDelete({
         userid: user._id,
         postid: post._id,
      });

      UserModel.findById(user._id).then((user) => {
         user.upvotedPosts = user.upvotedPosts.filter((post) => post != postid);
         user.save();
      });

      return res.status(200).json({
         status: 'success',
         message: `Post Upvote removed by user @${user.username}`,
         data: updatedPost,
      });
   }
});

exports. deletePostByPostId = catchAsync(async (req, res) => {
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
});
