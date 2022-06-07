import express from 'express';
import checkAuth from '../helpers/checkAuth';
import { commentOnPost, deleteCommentOfAPost, getCommentsOfAPost, replyOnComment } from '../controllers/commentControllers';

const router = express.Router();

router.get('/:postid', getCommentsOfAPost).post('/post/:postid', checkAuth, commentOnPost).post('/:commentid', checkAuth, replyOnComment)
.delete('/:postid/:commentid', checkAuth, deleteCommentOfAPost);

export default router;
