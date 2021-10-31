import { Component } from "./component";

export function renderDOM(
	query: string,
	...blocks: (Component<object> | null | undefined)[]
) {
	const root = document.querySelector(query);

	blocks.forEach((block) => {
		const content = block?.getContent();
		if (root && content) {
			root.append(content);
		}
	});

	return root;
}
