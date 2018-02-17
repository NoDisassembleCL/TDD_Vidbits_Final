const Video = require("../models/video");

async function seedDatabase() {
	let createdVideo = new Video({
		title: "Who let the dogs out?",
		description: "Who, who, who, who"
	});

	await Video.create(createdVideo);

	return createdVideo;
}

module.exports = {
	seedDatabase
};