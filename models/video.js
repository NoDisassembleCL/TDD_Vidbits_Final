const { mongoose } = require('../database');

const Video = mongoose.model(
  'Video',
  mongoose.Schema({
	  title: {
		  type: String,
		  required: true
	  },
	  description: String,
	  url: {
		  type: String,
		  required: [ true, "A url is required" ]
	  }
  })
);

module.exports = Video;
