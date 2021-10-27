import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Input.pug";
import "./Input.scss";

export interface Props extends HTMLInputElement {
	label: string;
}

export class Input extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
