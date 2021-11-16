import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Avatar, Props as AvatarProps } from "../Avatar";
import compileTemplate from "./ChatItem.pug";
import "./ChatItem.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	avatarUrl?: AvatarProps["url"];
	title: string;
	content: string;
	time: string;
	unreadCount?: number;
	active?: boolean;
}

export class ChatItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const avatar = new Avatar({
			url: this.props.avatarUrl,
		});

		this.children = {
			avatar,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
