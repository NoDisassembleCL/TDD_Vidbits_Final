const { assert } = require('chai');

const { generateRandomUrl } = require("../test-utils");

describe("User visits create page", () => { 
	describe("user submits new video", () => {
		it("throws an error if title is left empty", () => {
			let title = "";
			let description = "Cat does something funny. YouTube laughs.";
			let url = generateRandomUrl()

			browser.url("videos/create");
			browser.setValue("#video-title", title);
			browser.setValue("#video-description", description);
			browser.setValue("#video-url", url);
			browser.click("#video-submit");

			assert.include(browser.getText("#video-form"), "required");
		});
		
		it("throws an error if url is left empty", () => {
			let title = "Some title";
			let description = "Cat does something funny. YouTube laughs.";
			let url = "";

			browser.url("videos/create");
			browser.setValue("#video-title", title);
			browser.setValue("#video-description", description);
			browser.setValue("#video-url", url);
			browser.click("#video-submit");

			assert.include(browser.getText("#video-form"), "required");
		 });

		it("video submits successfully and shows up on landing after submission", () => {
			let title = "Cool Cats";
			let description = "Cat does something funny. YouTube laughs.";
			let url = generateRandomUrl();

			browser.url("videos/create");
			browser.setValue("#video-title", title);
			browser.setValue("#video-description", description);
			browser.setValue("#video-url", url);
			browser.click("#video-submit");

			assert.include(browser.getText("body"), title);
			assert.include(browser.getText("body"), description);
		 });
	 });
});