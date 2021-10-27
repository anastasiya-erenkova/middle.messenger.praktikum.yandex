export function parserDOM(stringHTML: string) {
	const nodeHTML = new DOMParser().parseFromString(stringHTML, "text/html");
	// NodeChild -> HTMLElement
	return nodeHTML.body.firstChild?.parentElement?.children[0];
}
