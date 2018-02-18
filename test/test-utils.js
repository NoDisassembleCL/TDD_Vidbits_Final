const Video = require("../models/video");

async function seedDatabase() {
	let createdVideo = new Video({
		title: "Who let the dogs out?",
		description: "Who, who, who, who",
		videoUrl: "https://www.youtube.com/embed/YVddwjEJ3Qk"
	});

	await Video.create(createdVideo);

	return createdVideo;
}

const generateRandomUrl = (domain) => {
	return `http://${domain}/${Math.random()}`;
};

module.exports = {
	seedDatabase,
	generateRandomUrl
};