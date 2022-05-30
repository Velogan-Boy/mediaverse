import mongoose from 'mongoose';

const FollowerSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
   },

   followerId: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Users',
         required: true,
      },
   ],
});

const FollowerModel = mongoose.model('Followers', FollowerSchema);

export default FollowerModel;
