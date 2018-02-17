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