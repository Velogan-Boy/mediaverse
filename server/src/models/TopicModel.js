const mongoose = require('mongoose');
const axios = require('axios');

const topicSchema = mongoose.Schema({
   name: String,
   count: { type: Number, default: 0 },
   cover: String,
});

topicSchema.pre('save', async function (next) {
   if (!this.cover) {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${this.name}&orientation=landscape&per_page=1&page=1`, {
         headers: {
            Authorization: process.env.PEXELS_API_KEY,
         },
      });

      if (response.data.photos.length > 0) {
         const { src } = response.data.photos[0];
         this.cover = src.landscape;
      } else {
         this.cover = 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
      }
   }
   next();
});
const TopicModel = mongoose.model('Topics', topicSchema);

module.exports = TopicModel;
