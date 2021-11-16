export function parserDOM(stringHTML: string) {
	const nodeHTML = new DOMParser().parseFromString(stringHTML, "text/html");
	// @TODO исправить типизацию
	// NodeChild -> HTMLElement
	return nodeHTML.body.firstChild as HTMLElement;
}
