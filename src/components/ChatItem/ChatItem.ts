import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Title } from "../Title";
import { Avatar, Props as AvatarProps } from "../Avatar";
import compileTemplate from "./ChatItem.pug";
import "./ChatItem.scss";

export interface Props extends Partial<HTMLDivElement> {
	avatarUrl: AvatarProps["url"];
	title: string;
	description: string;
	date: string;
	unreadCount?: number;
	active?: boolean;
}

export class ChatItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const chatItem = parserDOM(compileTemplate(this.props));
		const chatMain = chatItem?.querySelector(".chat-item__main");

		const avatar = new Avatar({
			url: this.props.avatarUrl,
			className: "chat-item__avatar",
		});

		chatMain?.before(avatar.getContent());

		return chatItem;
	}
}
