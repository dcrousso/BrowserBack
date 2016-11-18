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

	if (window !== window.top) {
		safari.self.tab.dispatchMessage("iframe", JSON.stringify({
			iframe: true,
			forward: event.shiftKey,
		}));
	} else
		navigate(event.shiftKey);
});


safari.self.addEventListener("message", event => {
	if (event.name !== "iframe")
		return;

	navigate(JSON.parse(event.message).forward);
});
