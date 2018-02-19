const { assert } = require('chai');

const { generateRandomUrl, fillAndClick } = require("../test-utils");

describe("User visits landing page", () => {
	describe("visits empty landing page", () => { 
		it("should be empty", () => {
			browser.url("/");

			assert.isEmpty(browser.getText("#videos-container"));
		});
		
		it("can navigate to the create page", () => { 
			browser.url("/");

			browser.click("a[href='videos/create']");

			assert.include(browser.getText("#page-title"), "Save a video");
		});
	});

	describe("visits landing page with existing video", () => {
		it("page contains the video", () => {
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				url: generateRandomUrl()
			};

			fillAndClick(createdVideo);

			browser.url("/");
			assert.equal(browser.getAttribute("iframe:last-child", "src"), createdVideo.url);
		});
		
		it("can navigate to video", () => { 
			let createdVideo = {
				title: "Cool Cats",
				description: "Something something kitties.",
				url: generateRandomUrl()
			};

			fillAndClick(createdVideo);
	
			browser.url("/");
			browser.click("a.show-video:last-child");

			assert.equal(browser.getText("h1"), createdVideo.title);
		});
	});
});