import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
   {
      authid: { type: String, required: true }, // comes from firebase
      fname: String,
      lname: String,
      username: { type: String, required: true, unique: true },
      email: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      zip: Number,
      country: String,
      latitude: Number,
      longitude: Number,
      profileImg: String,
   },
   {
      timestamps: true,
   }
);

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
