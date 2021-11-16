import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ChatItem } from "../ChatItem";
import compileTemplate from "./ChatList.pug";
import "./ChatList.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	chats: ChatItem[];
	activeChatIndex: number | null;
}

export class ChatList extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		this.children = {
			chats: this.props.chats,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
