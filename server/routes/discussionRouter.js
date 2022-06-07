import express from 'express';

import checkAuth from '../helpers/checkAuth';

import { getAllQuestionBasedOnTopic, getQuestionByQId, getTrendingQuestions, searchTopic, getTrendingTopics, postQuestion,postAnswer } from '../controllers/discussionControllers';

const router = express.Router();

router
   .get('/questions/topic/:topicId', getAllQuestionBasedOnTopic)
   .get('/questions/trending', getTrendingQuestions)
   .get('/topic/search', searchTopic)
   .get('/questions/:questionid', getQuestionByQId)
   .get('/topic/trending', getTrendingTopics)
   .post('/questions', checkAuth, postQuestion)
   .post('/questions/answer/:questionid', checkAuth, postAnswer);

export default router;
