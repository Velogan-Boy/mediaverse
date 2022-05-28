import mongoose from "mongoose";

const HashtagSchema = mongoose.Schema({
      name: String,
      count: Number
});

const HashtagModel = mongoose.model("Hashtags", HashtagSchema);

export default HashtagModel;
