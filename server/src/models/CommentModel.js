const mongoose = require('mongoose');

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

module.exports = CommentModel;
