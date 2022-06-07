const express = require('express');
const checkAuth = require('../helpers/checkAuth');
const { commentOnPost, deleteCommentOfAPost, getCommentsOfAPost, replyOnComment } = require('../controllers/commentControllers');

const router = express.Router();

router
   .get('/:postid', getCommentsOfAPost)
   .post('/post/:postid', checkAuth, commentOnPost)
   .post('/:commentid', checkAuth, replyOnComment)
   .delete('/:postid/:commentid', checkAuth, deleteCommentOfAPost);

module.exports = router;
