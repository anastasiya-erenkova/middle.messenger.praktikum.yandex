import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ChatItem } from "../../components/ChatItem";
import { ChatList, Props as ChatListProps } from "../../components/ChatList";
import { Chat } from "../../components/Chat";

import compileTemplate from "./Messenger.pug";
import "./Messenger.scss";
import { ChatsController } from "../../controllers/chats-controller";
import { globalStore } from "../../store";
import { checkUser } from "../../helpers/checkUser";
import { createSocket } from "../../utils/socket";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const chatList = new ChatList({});

const getChat = () => new Chat({});

export class Messenger extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	async componentDidMount() {
		if (!globalStore.user) {
			checkUser();
		}
	}

	render() {
		this.children = {
			chatList,
			chat: getChat(),
		};

		return parserDOM(compileTemplate(this.props));
	}
}
