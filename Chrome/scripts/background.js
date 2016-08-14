"use strict";

chrome.runtime.onMessage.addListener((message, sender) => {
	if (!message.iframe)
		return;

	chrome.tabs.sendMessage(sender.tab.id, message);
});
