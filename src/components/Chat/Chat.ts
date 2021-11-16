import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Avatar } from "../Avatar";
import { ChatItem } from "../ChatItem";
import { onFormSubmit } from "../../helpers/onFormSubmit";
import compileTemplate from "./Chat.pug";
import "./Chat.scss";

interface Message {
	time: string;
	content: string;
	isOwner?: boolean;
}

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	activeChat?: ChatItem;
	messages: Message[];
}

const events = {
	submit: onFormSubmit,
};

export class Chat extends Component<Props> {
	constructor(props: Props) {
		super({ ...props, events });
	}

	render() {
		const avatar = new Avatar({
			url: this.props.activeChat?.props.avatarUrl,
		});

		this.children = {
			avatar,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
