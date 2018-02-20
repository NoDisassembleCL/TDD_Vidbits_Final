const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedVideoToDatabase } = require("../test-utils");

describe("Server path /videos", () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("GET", () => {
		it("renders video already added", async () => {
			let seededVideo = await seedVideoToDatabase();

			let response = await request(app).get("/");

			assert.equal(response.status, 200);
			assert.include(response.text, seededVideo.title);
			assert.include(response.text, seededVideo.url);
		});
	});
});