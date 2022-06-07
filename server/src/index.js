require('@babel/core').transform('code', {
   presets: ['@babel/preset-env'],
});

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { userRouter, postRouter, commentRouter, discussionRouter } = require('./routes');

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
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/discussions', discussionRouter);

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
