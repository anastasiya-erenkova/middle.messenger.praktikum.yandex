import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Link.pug";
import "./Link.scss";

export interface Props extends Partial<HTMLAnchorElement>, ComponentProps {
	href: string;
	text: string;
	danger?: boolean;
}

export class Link extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
