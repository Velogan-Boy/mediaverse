const mongoose = require('mongoose');

const UpvoteSchema = mongoose.Schema({
   userid: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
   postid: { type: mongoose.Types.ObjectId, ref: 'Posts', required: true }
}, {
   timestamps: true
});

const UpvoteModel = mongoose.model('Upvotes', UpvoteSchema);

module.exports = UpvoteModel;