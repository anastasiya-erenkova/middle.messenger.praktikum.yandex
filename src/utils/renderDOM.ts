import { Component } from "./component";

export function renderDOM(
	query: string,
	...blocks: (Component<{}> | null | undefined)[]
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
