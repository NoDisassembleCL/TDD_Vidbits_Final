
const { assert } = require('chai');

const { generateRandomUrl, fillAndClick } = require("../test-utils");

describe("User visits single video page", () => { 
	describe("deletes a video", () => {
		it("removes video from main list", () => {
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				url: generateRandomUrl()
			};

			fillAndClick(createdVideo);

			browser.click("#video-delete");
			
			assert.notInclude(browser.getText("#videos-container"), createdVideo.title);
		 });
	 });
});