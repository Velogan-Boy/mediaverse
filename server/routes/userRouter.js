import express from 'express';

import checkAuth from '../helpers/checkAuth';
import { userSignIn, userSignUp, searchUser, editUser, deleteUser, getAllUsers } from '../controllers/userControllers';

const router = express.Router();

router.get('/signin', checkAuth, userSignIn).post('/signup', userSignUp).get('/search', searchUser).patch('/', checkAuth, editUser).delete('/', checkAuth, deleteUser).get('/', getAllUsers);

export default router;
