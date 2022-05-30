require('@babel/core').transform('code', {
   presets: ['@babel/preset-env'],
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { userRouter, postRouter, commentRouter, followerRouter } from './api';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/page', express.static('static'));

if (process.env.NODE_ENV == 'development ') {
   app.use(morgan('dev'));
}

// ROUTES
app.use('/user', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/follower', followerRouter);

// SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
   console.log(`✅ Server is running on port ${port} !!!`);
});

mongoose.connect(
   process.env.MONGODB_URI,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   },
   (err) => {
      if (err) console.log(err);
      else console.log('✅ MongoDB connection successfull !!!');
   }
);
