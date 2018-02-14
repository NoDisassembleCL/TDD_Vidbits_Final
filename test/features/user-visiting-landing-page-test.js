const {assert} = require('chai');

describe("User visits landing page", () => { 
	describe("visits empty landing page", () => { 
		it("should be empty", () => {
			browser.url("/");

			assert.isEmpty(browser.getText("#videos-container"));
		});
		
		it("can navigate to the create page", () => { 
			browser.url("/");

			browser.click("a[href='videos/create.html']");

			assert.include(browser.getText("#page-title"), "Save a video");
		});
	});
});