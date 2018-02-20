const Video = require("../models/video");
const Comment = require("../models/comment");

async function seedVideoToDatabase() {
	let createdVideo = new Video({
		title: "Who let the dogs out?",
		description: "Who, who, who, who",
		url: "https://www.youtube.com/embed/YVddwjEJ3Qk"
	});

	await Video.create(createdVideo);

	return createdVideo;
}

async function seedCommentToDatabase( videoId ) {
	let createdComment = new Comment({
		videoId: videoId,
		text: "This video was the best evar."
	});

	await Comment.create(createdComment);

	return createdComment;
}

const generateRandomUrl = (domain) => {
	return `http://${domain}/${Math.random()}`;
};

const fillAndClick = (createdVideo) => {
	browser.url("videos/create");
	browser.setValue("#video-title", createdVideo.title);
	browser.setValue("#video-description", createdVideo.description);
	browser.setValue("#video-url", createdVideo.url);
	browser.click("#video-submit");
 };

module.exports = {
	seedVideoToDatabase,
	seedCommentToDatabase,
	generateRandomUrl,
	fillAndClick
};