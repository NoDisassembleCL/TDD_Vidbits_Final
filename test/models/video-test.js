const {assert} = require('chai');

const { connectDatabase, disconnectDatabase } = require('../database-utilities');

const Video = require("../../models/video");

describe('Model: Video', () => {
	beforeEach(connectDatabase);
  
	afterEach(disconnectDatabase);

	describe("title", () => {
		it("is a String", () => {
			let titleAsInt = 1;
			let video = new Video({
				title: titleAsInt
			});

			assert.strictEqual(video.title, titleAsInt.toString());
		});

		it("is required", () => {
			let video = new Video({
				description: "Who cares"
			});

			video.validateSync();

			assert.strictEqual(video.errors.title.message, "Path `title` is required.");
		});
	});	

	describe("description", () => {
		it("is a String", () => {
			let descAsInt = 1;
			let video = new Video({
				description: descAsInt
			});

			assert.strictEqual(video.description, descAsInt.toString());
		});
	});	
});

module.exports = {
  connectDatabase,
  disconnectDatabase,
}