const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedVideoToDatabase, generateRandomUrl } = require("../test-utils");

describe("Server path: /videos/:id/deletions", () => { 
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("POST", () => {
		it("removes video from the database", async () => { 
			let seededVideo = await seedVideoToDatabase();

			let response = await request(app).post(`/videos/${seededVideo._id}/deletions`);

			let videos = await Video.find({});

			assert.equal(videos.length, 0);
		});
	});
});