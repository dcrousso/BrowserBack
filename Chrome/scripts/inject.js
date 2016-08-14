"use strict";

function navigate(forward = false) {
	if (forward)
		window.history.forward();
	else
		window.history.back();
}

window.addEventListener("keydown", event => {
	if (event.key !== "Backspace" || !document.activeElement)
		return;

	if (typeof document.activeElement.value === "string" || document.activeElement.getAttribute("contenteditable") === "true")
		return;

	event.preventDefault();
	event.stopPropagation();

	if (window !== window.top)
		chrome.runtime.sendMessage({iframe: true, forward: event.shiftKey});
	else
		navigate(event.shiftKey);
});

chrome.runtime.onMessage.addListener(message => {
	if (!message.iframe)
		return;

	navigate(message.forward);
});
