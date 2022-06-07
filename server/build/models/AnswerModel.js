const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
   userid: { type: mongoose.Types.ObjectId, ref: 'Users' },
   answer: String
}, {
   timestamps: true
});

const AnswerModel = mongoose.model('Answers', answerSchema);

module.exports = AnswerModel;