import mongoose from 'mongoose';

const answerSchema = mongoose.Schema(
   {
      userid: { type: mongoose.Types.ObjectId, ref: 'Users' },
      answer: String,
   },
   {
      timestamps: true,
   }
);

const AnswerModel = mongoose.model('Answers', answerSchema);

export default AnswerModel;
