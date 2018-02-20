const router = require('express').Router();

const Video = require('../models/video');
const Comment = require("../models/comment");
 
router.get("/", async (req, res) => {
	let videos = await Video.find({});

	res.render("videos/index", { videos });
});

router.get("/videos/create", (req, res) => {
	res.render("videos/create");
});

router.post("/videos", async (req, res) => {
	let newTitle = req.body.title;
	let newDesc = req.body.description;
	let newUrl = req.body.url;

	let createdVideo = new Video({
		title: newTitle,
		description: newDesc,
		url: newUrl
	});

	createdVideo.validateSync();

	if (createdVideo.errors) { 
		res.status(400).render("videos/create", { newVideo: createdVideo });
	}
	else {
		await Video.create(createdVideo);

		res.redirect(`/videos/${createdVideo._id}`);
	}	
});

router.get("/videos/:videoId", async (req, res) => { 
	let videoToShow = await Video.findById(req.params.videoId);
	let commentsToShow = await Comment.find({ videoId: req.params.videoId });

	res.render("videos/show", { foundVideo: videoToShow, comments: commentsToShow, commentError: req.query.ce });
});

router.get("/videos/:videoId/edit", async (req, res) => {
	let videoToShow = await Video.findById(req.params.videoId);

	res.render("videos/edit", { newVideo: videoToShow });
});
 
router.post("/videos/:videoId/updates", async (req, res) => { 
	let updatedTitle = req.body.title;
	let updatedDesc = req.body.description;
	let updatedUrl = req.body.url;

	let updatedVideo = new Video({
		title: updatedTitle,
		description: updatedDesc,
		url: updatedUrl
	});

	updatedVideo.validateSync();

	if (updatedVideo.errors) {
		res.status(400).render("videos/edit", { newVideo: updatedVideo });
	}
	else {
		await Video.findByIdAndUpdate(req.params.videoId, {
			title: updatedTitle,
			description: updatedDesc,
			url: updatedUrl
		}, () => {
			res.redirect(`/videos/${req.params.videoId}`);
		});
	}	
});

router.post("/videos/:videoId/deletions", async (req, res) => {
	await Video.findByIdAndRemove(req.params.videoId);

	res.redirect("/");
});
 
router.post("/videos/:videoId/addcomment", async (req, res) => {
	let newComment = req.body.commentText;

	let createdComment = new Comment({
		videoId: req.params.videoId,
		text: newComment
	});

	createdComment.validateSync();

	if (createdComment.errors) {
		res.redirect(`/videos/${req.params.videoId}?ce=true`, 400);
	}
	else {
		await Comment.create(createdComment);
	
		res.redirect(`/videos/${req.params.videoId}`);
	}	
});

module.exports = router;
