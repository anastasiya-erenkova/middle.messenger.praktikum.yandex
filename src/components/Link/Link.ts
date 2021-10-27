import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Link.pug";
import "./Link.scss";

export interface Props {
	href: string;
	text: string;
	danger?: boolean;
	className?: string;
}

export class Link extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
