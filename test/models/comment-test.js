const { assert } = require('chai');
const {mongoose} = require('../../database');

const { connectDatabase, disconnectDatabase } = require('../database-utilities');

const Comment = require("../../models/comment");

describe('Model: Comment', () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("videoId", () => {
		it("is a String", () => {
			let videoIdAsInt = 1;
			let comment = new Comment({
				videoId: videoIdAsInt,
				timestamp: new Date(),
				text: "Blah"
			});

			assert.strictEqual(comment.videoId, videoIdAsInt.toString());
		});

		it("is required", () => {
			let comment = new Comment({
				timestamp: new Date(),
				text: "Blah"
			});

			comment.validateSync();

			assert.strictEqual(comment.errors.videoId.message, "Path `videoId` is required.");
		});
	});

	describe("timestamp", () => {
		it("is a Date", () => {
			let timestamp = new Date();
			let comment = new Comment({
				videoId: "blahblah",
				timestamp: timestamp,
				text: "Blah"
			});

			assert.strictEqual(comment.timestamp, timestamp);
		});

		it("is required", () => {
			let comment = new Comment({
				videoUrl: "blah blah",
				text: "Blah"
			});

			comment.validateSync();

			assert.strictEqual(comment.errors.videoId.message, "Path `videoId` is required.");
		});
	});

	describe("text", () => {
		it("is a String", () => {
			let textAsInt = 1;
			let comment = new Comment({
				videoId: "blahbla",
				timestamp: new Date(),
				text: textAsInt
			});

			assert.strictEqual(comment.text, textAsInt.toString());
		});

		it("is required", () => {
			let comment = new Comment({
				videoId: "blahblad",
				timestamp: new Date(),
				text: ""
			});

			comment.validateSync();

			assert.strictEqual(comment.errors.text.message, "Path `text` is required.");
		});
	});	
});