import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Link } from "../Link";
import compileTemplate from "./Error.pug";
import "./Error.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {
	status: number;
	description: string;
}

const linkBackward = new Link({
	href: "../Chats/Chats.html",
	text: "Назад к чатам",
	className: "error__link",
});

export class Error extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const error = parserDOM(compileTemplate(this.props));
		error?.append(linkBackward.getContent());

		return error;
	}
}
