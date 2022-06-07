import catchAsync from '../utils/catchAsync';
import { TopicModel, QuestionModel, AnswerModel, UpvoteAnswerModel } from '../models';

export const getAllQuestionBasedOnTopic = catchAsync(async (req, res) => {
   const topic = await TopicModel.findById(req.params.topicId);

   if (!topic) {
      return res.status(404).json({
         status: 'fail',
         message: 'Topic not found',
      });
   }
   const questions = await QuestionModel.find({ topic: topic._id });

   return res.status(200).json({
      status: 'success',
      data: questions,
   });
});

export const getTrendingQuestions = catchAsync(async (req, res) => {
   const questions = await QuestionModel.find().limit(5).populate('topic');

   // sort question based on answer count
   const sortedQuestions = questions.sort((a, b) => b.answers.length - a.answers.length);

   res.status(200).json({
      status: 'success',
      results: sortedQuestions.length,
      data: sortedQuestions,
   });
});

export const getQuestionByQId = catchAsync(async (req, res) => {
   const { questionid } = req.params;
   
   console.log(questionid);

   const question = await QuestionModel.findById(questionid).populate('userid topic answers');

   res.status(200).json({
      status: 'success',
      data: question,
   });
});

export const searchTopic = catchAsync(async (req, res) => {
   const { keyword } = req.query;

   const topics = await TopicModel.find({
      name: new RegExp(keyword, 'i'),
   });

   res.status(200).json({
      status: 'success',
      results: topics.length,
      data: topics,
   });
});

export const getTrendingTopics = catchAsync(async (req, res) => {
   const topics = await TopicModel.find().sort('-count').limit(3);

   res.status(200).json({
      status: 'success',
      results: topics.length,
      data: topics,
   });
});

export const postQuestion = catchAsync(async (req, res) => {
   const user = req.user;

   const { topic, question, description } = req.body;

   //check if topic is already available
   const topicExists = await TopicModel.findOne({ name: new RegExp(topic, 'i') });

   if (!topicExists) {
      const newTopic = await TopicModel.create({ name: topic });

      const newQuestion = await QuestionModel.create({
         userid: user._id,
         topic: newTopic._id,
         question,
         description,
      });

      return res.status(201).json({
         status: 'success',
         data: newQuestion,
      });
   }

   await TopicModel.findByIdAndUpdate(topicExists._id, { $inc: { count: 1 } });

   const newQuestion = await QuestionModel.create({
      userid: user._id,
      topic: topicExists._id,
      question,
      description,
   });

   res.status(201).json({
      status: 'success',
      data: newQuestion,
   });
});

export const postAnswer = catchAsync(async (req, res) => {
   const user = req.user;

   const { questionid } = req.params;
   const { answer } = req.body;

   const newAnswer = await AnswerModel.create({
      userid: user._id,
      questionid,
      answer,
   });

   await QuestionModel.findByIdAndUpdate(questionid, {
      $push: {
         answers: newAnswer._id,
      },
   });

   return res.status(201).json({
      status: 'success',
      data: newAnswer,
   });
});
