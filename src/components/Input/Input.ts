import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Input.pug";
import "./Input.scss";

export interface Props extends Partial<HTMLInputElement>, ComponentProps {
	label: string;
	name: HTMLInputElement["name"];
	invalid?: boolean;
	errorText?: string | null;
	accept?: string;
}

export class Input extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
