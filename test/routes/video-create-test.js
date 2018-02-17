const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');

describe("Server path /videos", () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("POST", () => {
		it("responds with an OK status", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.strictEqual(response.status, 200);
		});

		it("saves video to the database", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			let savedVideo = await Video.findOne(video);

			assert.isNotNull(savedVideo);
			assert.equal(savedVideo.title, video.title);
			assert.equal(savedVideo.description, video.description);
		});

		it("contains the video information in the response", async () => {
			let video = {
				title: "Cool Cats",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.include(response.text, video.title);
			assert.include(response.text, video.description);
		});

		it("doesn't save video info if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			let savedVideos = await Video.find({});

			assert.equal(savedVideos.length, 0);
		});

		it("responds with error if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.equal(response.status, 400);
		});

		it("preserves description field if title is empty", async () => { 
			let video = {
				title: "",
				description: "Something something kitties."
			};

			let response = await request(app).post("/videos").type("form").send(video);

			assert.include(response.text, video.description);
		});
	});
});