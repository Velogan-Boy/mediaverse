import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
   {
      userid: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
      type: { type: String, enum: ['text', 'image'], default: 'text' },
      upvotes: { type: Number, default: 0 },
      comments: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
      caption: String,
      hashtags: [{ type: mongoose.Types.ObjectId, ref: 'Hashtags' }],
      imageURL: String,
      location: String,
   },
   {
      timestamps: true,
   }
);

const PostModel = mongoose.model('Posts', postSchema);

export default PostModel;
