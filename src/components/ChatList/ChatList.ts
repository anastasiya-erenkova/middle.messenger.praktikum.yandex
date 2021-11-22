import { Chat } from "../../api/chats-api";
import { ChatsController } from "../../controllers/chats-controller";
import { storeInstance, globalStore } from "../../store";
import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ChatItem } from "../ChatItem";
import compileTemplate from "./ChatList.pug";
import "./ChatList.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	chats: ChatItem[];
}

const getChats = (data: Chat[]) => data.map((chat) => new ChatItem(chat));

export class ChatList extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	async componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(ChatList.EVENTS.FLOW_CDU));

		await ChatsController.fetch();
		this.setProps({
			chats: globalStore.chats,
		});
	}

	render() {
		this.children = {
			chats: getChats(this.props.chats || []),
		};

		return parserDOM(compileTemplate(this.props));
	}
}
