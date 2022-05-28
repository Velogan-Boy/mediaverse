require('@babel/core').transform('code', {
   presets: ['@babel/preset-env'],
});

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';

import { userRouter, postRouter} from './api';


const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(helmet());

// ROUTES
app.use('/user', userRouter);
app.use('/post', postRouter);

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
