const router = require('express').Router();

const Video = require('../models/video');
 
router.get("/", async (req, res) => {
	let videos = await Video.find({});

	res.render("videos/index", { videos });
});

router.post("/videos", async (req, res) => {
	let newTitle = req.body.title;
	let newDesc = req.body.description;

	let createdVideo = new Video({
		title: newTitle,
		description: newDesc
	});

	createdVideo.validateSync();

	if (createdVideo.errors) { 
		res.status(400).render("videos/create", { video: createdVideo });
	}
	else {
		await Video.create(createdVideo);

		res.render("show", { video: createdVideo });
	}	
});

router.get("/videos/create", (req, res) => {
	res.render("videos/create");
});

module.exports = router;
