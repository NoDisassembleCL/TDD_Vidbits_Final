const { assert } = require('chai');

describe("User visits create page", () => { 
	describe("user submits new video", () => {
		it("video submits successfully and shows up on landing after submission", () => {
			let title = "Cool Cats";
			let description = "Cat does something funny. YouTube laughs."

			browser.url("videos/create.html");
			browser.setValue("#video-title", title);
			browser.setValue("#video-description", description);
			browser.click("#video-submit");

			assert.include(browser.getText("body"), title);
			assert.include(browser.getText("body"), description);
		 });
	 });
});