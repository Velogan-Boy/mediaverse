const express = require('express');

const checkAuth = require('../helpers/checkAuth');

const {
   getAllQuestionBasedOnTopic,
   getQuestionByQId,
   getTrendingQuestions,
   searchTopic,
   getTrendingTopics,
   postQuestion,
   postAnswer,
} = require('../controllers/discussionControllers');

const router = express.Router();

router
   .get('/questions/topic/:topicId', getAllQuestionBasedOnTopic)
   .get('/questions/trending', getTrendingQuestions)
   .get('/topic/search', searchTopic)
   .get('/questions/:questionid', getQuestionByQId)
   .get('/topic/trending', getTrendingTopics)
   .post('/questions', checkAuth, postQuestion)
   .post('/questions/answer/:questionid', checkAuth, postAnswer);

module.exports = router;
