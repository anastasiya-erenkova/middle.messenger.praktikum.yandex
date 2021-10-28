import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Avatar.pug";
import "./Avatar.scss";

export interface Props extends Partial<HTMLDivElement> {
	url: string;
	className?: string;
}

export class Avatar extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
