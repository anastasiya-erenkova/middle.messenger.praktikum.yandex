import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Link } from "../Link";
import compileTemplate from "./Info.pug";
import "./Info.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	label?: string;
	value?: string;
	name?: string;
	link?: Link;
}
export class Info extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const info = parserDOM(compileTemplate(this.props));

		if (this.props.link) {
			info?.append(this.props.link.getContent());
		}

		return info;
	}
}
