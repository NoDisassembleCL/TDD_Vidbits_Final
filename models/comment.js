const {mongoose} = require('../database');

const Comment = mongoose.model(
  'Comment',
	mongoose.Schema({
		videoId: {
			type: String,
			required: true
		},
		timestamp: {
			type: Date,
			required: true,
			default: Date.now
		},
		text: {
		  type: String,
		  required: true
	  }
  })
);

module.exports = Comment;