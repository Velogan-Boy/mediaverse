const mongoose = require('mongoose');

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
      },
      upvotedPosts: [{ type: mongoose.Types.ObjectId, ref: 'Posts' }],
      following: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
      followers: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', function (next) {
   if (!this.profileImg) {
      this.profileImg = `https://ui-avatars.com/api/?name=${this.fname}+${this.lname}&length=2&rounded=true&bold=true&size=128&background=random`;
   }
   next();
});

//deselect authid whenever we get the user details

userSchema.pre('get', function (next) {
   this.select('-__v');
   this.select('-authid');
   next();
});

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;