const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedDatabase } = require("../test-utils");

describe("Server path /videos/:id", () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("GET", () => {
		it("displays the video details", async () => { 
			let seededVideo = await seedDatabase();

			let response = await request(app).get(`/videos/${seededVideo._id}`);

			assert.include(response.text, seededVideo.title);
			assert.include(response.text, seededVideo.description);
			assert.include(response.text, seededVideo.url);
		});
	 });
});