const { assert } = require('chai');

const { generateRandomUrl, fillAndClick } = require("../test-utils");

describe("user views video comments", () => {
	describe("user adds comment", () => {
		it("comment field is on shown video page", () => {
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				url: generateRandomUrl()
			};

			fillAndClick(createdVideo);

			assert.isNotNull(browser.getHTML("#comment-text"));
		});

		it("can add comment and have show under video", () => { 
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				url: generateRandomUrl()
			};
			let commentText = "This video was sooo rad and cute!!! Like, OMG!";

			fillAndClick(createdVideo);

			browser.setValue("#comment-text", commentText);
			browser.click("#comment-add");

			assert.include(browser.getText("#comments-container"), commentText);
		});
	 });
});