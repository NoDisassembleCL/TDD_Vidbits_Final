const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedDatabase, generateRandomUrl } = require("../test-utils");

describe("Server path: /videos/:id/edit", () => { 
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("GET", () => { 
		it("displays a form to update the video", async () => {
			let seededVideo = await seedDatabase();

			let response = await request(app).get(`/videos/${seededVideo._id}/edit`);
			
			assert.equal(response.status, 200);
			assert.include(response.text, "form");
		});
	});
});

describe("Server path: /videos/:id/updates", () => { 
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("POST", () => { 
		it("updates the video in the database", async () => {
			let seededVideo = await seedDatabase();
			let updates = {
				title: "Not-so-cool kitties",
				description: "Kitties something else.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post(`/videos/${seededVideo._id}/updates`).type("form").send(updates);

			let updatedVideo = await Video.findById(seededVideo._id);

			assert.isNotNull(updatedVideo);
			assert.equal(updatedVideo.title, updates.title);
			assert.equal(updatedVideo.description, updates.description);
			assert.equal(updatedVideo.videoUrl, updates.videoUrl);
		});
		
		it("redirects to show page on success", async () => {
			let seededVideo = await seedDatabase();
			let updates = {
				title: "Not-so-cool kitties",
				description: "Kitties something else.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post(`/videos/${seededVideo._id}/updates`).type("form").send(updates);

			assert.equal(response.status, 302);
			assert.include(response.text, `/videos/${seededVideo._id}`);
		});
		
		it("does not update video if title is empty", async () => { 
			let seededVideo = await seedDatabase();
			let updates = {
				title: "",
				description: "Kitties something else.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post(`/videos/${seededVideo._id}/updates`).type("form").send(updates);

			let updatedVideo = await Video.findById(seededVideo._id);

			assert.isNotNull(updatedVideo);
			assert.equal(updatedVideo.title, seededVideo.title);
		});

		it("responds with error if title is empty", async () => { 
			let seededVideo = await seedDatabase();
			let updates = {
				title: "",
				description: "Kitties something else.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post(`/videos/${seededVideo._id}/updates`).type("form").send(updates);

			assert.equal(response.status, 400);
		});

		it("re-shows edit form if title is empty", async () => {
			let seededVideo = await seedDatabase();
			let updates = {
				title: "",
				description: "Kitties something else.",
				videoUrl: generateRandomUrl()
			};

			let response = await request(app).post(`/videos/${seededVideo._id}/updates`).type("form").send(updates);

			assert.include(response.text, 'id="video-title"');
		 });
	});
});