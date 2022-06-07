import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
   userid: { type: mongoose.Types.ObjectId, ref: 'Users' },
   topic: { type: mongoose.Types.ObjectId, ref: 'Topics' },
   question: String,
   description: String,
   answers: [{ type: mongoose.Types.ObjectId, ref: 'Answers' }],
}, {
   timestamps: true,
});

const questionModel = mongoose.model('Questions', questionSchema);

export default questionModel;
