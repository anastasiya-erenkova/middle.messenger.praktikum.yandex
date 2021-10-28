import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Props as LinkProps } from "../Link";
import compileTemplate from "./Info.pug";
import "./Info.scss";

interface InfoProps {
	label?: string;
	value?: string;
	name?: string;
	link?: Component<LinkProps>;
}

interface InfoBlockProps {
	fields: Component<InfoProps>[];
}

export class InfoBlock extends Component<InfoBlockProps> {
	constructor(props: InfoBlockProps) {
		super(props);
	}

	render() {
		const infoBlock = document.createElement("div");
		infoBlock.classList.add("info-block");

		this.props.fields.forEach((info) => {
			infoBlock.append(info.getContent());
		});

		return infoBlock;
	}
}

export class Info extends Component<InfoProps> {
	constructor(props: InfoProps) {
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
