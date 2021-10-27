import { Block } from "./block";

export function renderDOM(query: string, block: Block<{}>) {
	const root = document.querySelector(query);
	root.appendChild(block.getContent());
	return root;
}
