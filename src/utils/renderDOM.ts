import { Component } from "./component";

export function renderDOM(query: string, block: Component<{}>) {
	const root = document.querySelector(query);
	const content = block.getContent();
	if (root && content) {
		root.appendChild(content);
	}
	return root;
}
