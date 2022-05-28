import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
   {
      userid: { type: mongoose.Types.ObjectId, ref: 'Users' },
      comment: String,
      replies: [{ type: mongoose.Types.ObjectId, ref: 'Comments' }],
   },
   {
      timestamps: true,
   }
);

const CommentModel = mongoose.model('Comments', commentSchema);

export default CommentModel;