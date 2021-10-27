import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Button.pug";
import "./Button.scss";

export interface Props extends Partial<HTMLButtonElement> {
	text: string;
	autoTop?: boolean;
}

export class Button extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
