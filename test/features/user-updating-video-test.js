
const { assert } = require('chai');

const { generateRandomUrl, fillAndClick } = require("../test-utils");

describe("User visits update page", () => { 
	describe("updates a video", () => {
		it("updates the videos values", () => { 
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};
			let updatedTitle = "Not-so-cool kitties";
			let updatedDescription = "Kitties something else.";
			let updatedUrl = generateRandomUrl();

			fillAndClick(createdVideo);

			browser.click("#video-edit");
			browser.setValue("#video-title", updatedTitle);
			browser.setValue("#video-description", updatedDescription);
			browser.setValue("#video-url", updatedUrl);
			browser.click("#video-submit");

			assert.include(browser.getText("h1"), updatedTitle);
		});

		it("doesn't create a new video", () => { 
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				videoUrl: generateRandomUrl()
			};
			let updatedTitle = "Not-so-cool kitties";
			let updatedDescription = "Kitties something else.";
			let updatedUrl = generateRandomUrl();

			fillAndClick(createdVideo);

			browser.click("#video-edit");
			browser.setValue("#video-title", updatedTitle);
			browser.setValue("#video-description", updatedDescription);
			browser.setValue("#video-url", updatedUrl);
			browser.click("#video-submit");

			browser.url("/");

			assert.notInclude(browser.getText("#videos-container"), createdVideo.title);
		});

	 });
});