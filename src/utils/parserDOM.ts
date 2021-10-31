export function parserDOM(stringHTML: string) {
	const nodeHTML = new DOMParser().parseFromString(stringHTML, "text/html");
	// @TODO исправить типизацию
	// NodeChild -> HTMLElement
	return (
		(nodeHTML.body.firstChild?.parentElement?.children[0] as HTMLElement) ?? null
	);
}
