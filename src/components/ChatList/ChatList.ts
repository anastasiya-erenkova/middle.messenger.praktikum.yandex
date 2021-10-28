import { Component } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Props as ChatItemProps } from "../ChatItem";
import compileTemplate from "./ChatList.pug";
import "./ChatList.scss";

export interface Props extends Partial<HTMLDivElement> {
	chats: Component<ChatItemProps>[];
}

export class ChatList extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		const chatList = parserDOM(compileTemplate(this.props));

		const chatsContent = this.props.chats.map((chat) => chat.getContent());
		chatList?.append(...chatsContent);

		return chatList;
	}
}
