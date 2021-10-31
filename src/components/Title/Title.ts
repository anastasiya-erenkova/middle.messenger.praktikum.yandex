import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import compileTemplate from "./Title.pug";
import "./Title.scss";

export interface Props extends Partial<HTMLHeadingElement>, ComponentProps {
	title: string;
	level?: number;
	className?: string;
}

export class Title extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return parserDOM(compileTemplate(this.props));
	}
}
