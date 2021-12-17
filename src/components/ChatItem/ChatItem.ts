import { Chat } from "../../api/chats-api";
import { globalStore, storeInstance } from "../../store";
import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Avatar, Props as AvatarProps } from "../Avatar";
import compileTemplate from "./ChatItem.pug";
import "./ChatItem.scss";

export interface Props
	extends Omit<Partial<HTMLDivElement>, "id">,
		ComponentProps {
	avatarUrl?: AvatarProps["url"];
	title: string;
	id: number;
	content: string;
	time: string;
	unreadCount?: number;
	active?: boolean;
	activeChatId?: string;
}

export class ChatItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(ChatItem.EVENTS.FLOW_CDU));

		this.setProps({
			events: {
				click: () => {
					storeInstance.setStore("activeChatId", this.props.id);
					storeInstance.setStore(
						"activeChat",
						globalStore.chats.find((chat: Chat) => chat.id === this.props.id)
					);
				},
			},
		});
	}

	render() {
		const avatar = new Avatar({
			url: this.props.avatarUrl,
		});

		this.children = {
			avatar,
		};

		this.setProps({
			active: globalStore.activeChatId === this.props.id,
		});

		return parserDOM(compileTemplate(this.props));
	}
}
