import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ChatList, Props as ChatListProps } from "../../components/ChatList";
import { Chat } from "../../components/Chat";
import { Modal } from "../../components/Modal";
import { globalStore } from "../../store";
import { checkUser } from "../../helpers/checkUser";

import compileTemplate from "./Messenger.pug";
import "./Messenger.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const getChatList = () => new ChatList({});
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
			chatList: getChatList(),
			chat: getChat(),
		};

		return parserDOM(compileTemplate(this.props));
	}
}
