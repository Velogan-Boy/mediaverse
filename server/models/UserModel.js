import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
   {
      authid: { type: String, required: true }, // comes from firebase
      fname: String,
      lname: String,
      username: { type: String, required: true },
      email: String,
      latitude: Number,
      longitude: Number,
      profileImg: {
         type: String,
         default: 'https://firebasestorage.googleapis.com/v0/b/socialapp-5e56c.appspot.com/o/avatar.png?alt=media&token=37bb52ed-61ed-4e00-88de-e9a5eb6ae2bb',
      },
      upvotedPosts: [{ type: mongoose.Types.ObjectId, ref: 'Posts' }],
      following: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
      followers: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
   },
   {
      timestamps: true,
   }
);

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
