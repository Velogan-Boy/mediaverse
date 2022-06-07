const { UserModel } = require('../models');
const catchAsync = require('../utils/catchAsync');

const checkAuth = catchAsync(async function (req, res, next) {
   const { authorization: authid } = req.headers;

   if (!authid) {
      return res.status(401).json({
         error: 'Unauthorized',
      });
   }

   const user = await UserModel.findOne({ authid });

   if (!user) {
      return res.status(404).json({
         status: 'fail',
         message: 'User not found',
      });
   }

   req.user = user;

   next();
});

module.exports = checkAuth;
