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

const fillAndClick = (createdVideo) => {
	browser.url("videos/create");
	browser.setValue("#video-title", createdVideo.title);
	browser.setValue("#video-description", createdVideo.description);
	browser.setValue("#video-url", createdVideo.videoUrl);
	browser.click("#video-submit");
 };

module.exports = {
	seedDatabase,
	generateRandomUrl,
	fillAndClick
};