const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedDatabase, generateRandomUrl } = require("../test-utils");

describe("Server path /videos", () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("POST", () => {
		it("responds with an OK status", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.strictEqual(response.status, 302);
		});

		it("saves video to the database", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			let savedVideo = await Video.findOne(video);

			assert.isNotNull(savedVideo);
			assert.equal(savedVideo.title, video.title);
			assert.equal(savedVideo.description, video.description);
			assert.equal(savedVideo.videoUrl, video.videoUrl);
		});

		it("returns redirect to new vids page on success", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.equal(response.status, 302);
			assert.notInclude(response.text, "create");
		});

		it("doesn't save video info if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			let savedVideos = await Video.find({});

			assert.equal(savedVideos.length, 0);
		});

		it("responds with error if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.equal(response.status, 400);
		});

		it("preserves description field if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.include(response.text, video.description);
		});

		it("preserves url field if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.include(response.text, video.videoUrl);
		});
	});
});