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

	navigate(event.shiftKey);
});
