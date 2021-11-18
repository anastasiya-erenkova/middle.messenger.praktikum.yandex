import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";

import { Link } from "../Link";

import compileTemplate from "./Error.pug";
import "./Error.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	status: number;
	description: string;
}

const linkBackward = new Link({
	href: "./messenger",
	text: "Назад к чатам",
});

export class Error extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		this.children = {
			linkBackward,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
