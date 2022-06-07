import mongoose from 'mongoose';
import axios from 'axios';

const HashtagSchema = mongoose.Schema({
   name: String,
   count: Number,
   cover: String,
});

HashtagSchema.pre('save', async function (next) {
   if (!this.cover) {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${this.name}&orientation=landscape&per_page=1&page=1`, {
         headers: {
            Authorization: process.env.PEXELS_API_KEY,
         },
      });

      if (response.data.photos.length > 0) {
         const {src } = response.data.photos[0];
         this.cover = src.landscape;
      } else {
         this.cover = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
      }
   }

   next();
});

const HashtagModel = mongoose.model('Hashtags', HashtagSchema);

export default HashtagModel;
