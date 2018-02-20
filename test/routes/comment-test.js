const { assert } = require('chai');
const request = require('supertest');
const { jsdom } = require('jsdom');

const app = require('../../app');
const Comment = require("../../models/comment");

const { connectDatabase, disconnectDatabase } = require('../database-utilities');
const { seedVideoToDatabase } = require("../test-utils");

describe("Server path /videos/:id/addcomment", () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("POST", () => {
		it("saves comment to the database", async () => {
			let seededVideo = await seedVideoToDatabase();

			let comment = {
				commentText: "Something something kitties."
			};

			let response = await request(app).post(`/videos/${seededVideo.id}/addcomment`).type("form").send(comment);

			let savedComment = await Comment.findOne({ videoId: seededVideo._id});

			assert.isNotNull(savedComment);
			assert.equal(savedComment.videoId, seededVideo._id);
			assert.equal(savedComment.text, comment.commentText);
		});

		it("returns to video page on success", async () => {
			let seededVideo = await seedVideoToDatabase();

			let comment = {
				commentText: "Something something kitties."
			};

			let response = await request(app).post(`/videos/${seededVideo.id}/addcomment`).type("form").send(comment);

			assert.equal(response.status, 302);
			assert.notInclude(response.text, "Not Found");
		});

		it("doesn't save comment if text is empty", async () => { 
			let seededVideo = await seedVideoToDatabase();

			let comment = {
				commentText: ""
			};

			let response = await request(app).post(`/videos/${seededVideo.id}/addcomment`).type("form").send(comment);

			let savedComment = await Comment.find({});

			assert.equal(savedComment.length, 0);
		});

		it("responds with error if text is empty", async () => { 
			let seededVideo = await seedVideoToDatabase();

			let comment = {
				commentText: ""
			};

			let response = await request(app).post(`/videos/${seededVideo.id}/addcomment`).type("form").send(comment);

			assert.equal(response.status, 400);
			assert.include(response.text, "Some comment text is required");
		});
	 });
});