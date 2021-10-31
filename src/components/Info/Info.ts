import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Link } from "../Link";
import compileTemplate from "./Info.pug";
import "./Info.scss";

interface InfoProps extends Partial<HTMLDivElement>, ComponentProps {
	label?: string;
	value?: string;
	name?: string;
	link?: Link;
}

interface InfoBlockProps extends Partial<HTMLDivElement>, ComponentProps {
	fields: Info[];
}

export class InfoBlock extends Component<InfoBlockProps> {
	constructor(props: InfoBlockProps) {
		super(props);
	}

	render() {
		const infoBlock = document.createElement("div");
		infoBlock.classList.add("info-block");

		const fieldsContent = this.props.fields.map((field) => field.getContent());
		infoBlock.append(...fieldsContent);

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
