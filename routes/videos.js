const router = require('express').Router();

const Video = require('../models/video');
 
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
	let newUrl = req.body.videoUrl;

	let createdVideo = new Video({
		title: newTitle,
		description: newDesc,
		videoUrl: newUrl
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

	res.render("videos/show", { foundVideo: videoToShow });
});

router.get("/videos/:videoId/edit", async (req, res) => {
	let videoToShow = await Video.findById(req.params.videoId);

	res.render("videos/edit", { newVideo: videoToShow });
});
 
router.post("/videos/:videoId/updates", async (req, res) => { 
	let updatedTitle = req.body.title;
	let updatedDesc = req.body.description;
	let updatedUrl = req.body.videoUrl;

	let updatedVideo = new Video({
		title: updatedTitle,
		description: updatedDesc,
		videoUrl: updatedUrl
	});

	updatedVideo.validateSync();

	if (updatedVideo.errors) {
		res.status(400).render("videos/edit", { newVideo: updatedVideo });
	}
	else {
		await Video.findByIdAndUpdate(req.params.videoId, {
			title: updatedTitle,
			description: updatedDesc,
			videoUrl: updatedUrl
		}, () => {
			res.redirect(`/videos/${req.params.videoId}`);
		});
	}	
});

router.post("/videos/:videoId/deletions", async (req, res) => {
	await Video.findByIdAndRemove(req.params.videoId);

	res.redirect("/");
 });

module.exports = router;
