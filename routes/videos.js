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

module.exports = router;
