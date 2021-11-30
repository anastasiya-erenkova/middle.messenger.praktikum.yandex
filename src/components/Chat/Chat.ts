import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Avatar } from "../Avatar";
import { ChatItem, Props as ChatItemProps } from "../ChatItem";
import { getFormData } from "../../helpers/getFormData";
import { storeInstance, globalStore } from "../../store";

import compileTemplate from "./Chat.pug";
import "./Chat.scss";
import { createSocket } from "../../utils/socket";
import { ChatsController } from "../../controllers/chats-controller";

interface Message {
	time: string;
	content: string;
	isOwner?: boolean;
}

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	activeChatId?: ChatItemProps["id"];
	activeChat?: ChatItem;
	messages: Message[];
}

const mergeData = (oldData, newData) => {
	const result = oldData;

	newData.forEach((item) => {
		const similarItemIndex = oldData.findIndex((m) => m.id === item.id);

		if (similarItemIndex > -1) {
			result[similarItemIndex] = item;
		} else {
			result.push(item);
		}
	});

	return result;
};

const sortByTime = (a, b) => new Date(a.time) - new Date(b.time);

const createChatSocket = async () => {
	if (globalStore.user && globalStore.activeChatId) {
		const getToken = () => globalStore.tokens?.[globalStore.activeChatId];

		if (!getToken()) {
			await ChatsController.getToken(globalStore.activeChatId);
		}

		const token = getToken();
		const socket = createSocket(
			globalStore.user.id,
			globalStore.activeChatId,
			token
		);

		socket.addEventListener("open", () => {
			console.log("Соединение установлено");

			socket.send(
				JSON.stringify({
					content: "0",
					type: "get old",
				})
			);
		});

		socket.addEventListener("message", (event) => {
			const parseData = JSON.parse(event.data);
			const newMessages = Array.isArray(parseData) ? parseData : [parseData];

			const messagesWithStore =
				globalStore.messages && globalStore.messages[globalStore.activeChatId]
					? mergeData(globalStore.messages[globalStore.activeChatId], newMessages)
					: newMessages;

			messagesWithStore.sort(sortByTime);

			if (globalStore.messages) {
				storeInstance.setStore("messages", {
					...globalStore.messages,
					[globalStore.activeChatId]: messagesWithStore,
				});
			} else {
				storeInstance.setStore("messages", {
					[globalStore.activeChatId]: messagesWithStore,
				});
			}
		});

		return socket;
	}

	return null;
};

export class Chat extends Component<Props> {
	constructor(props: Props) {
		super({
			...props,
			events: {
				submit: (e) => {
					e.preventDefault();
					const data = getFormData(e);
					this.sockets[globalStore.activeChatId].send(
						JSON.stringify({
							content: data.message,
							type: "message",
						})
					);
				},
			},
		});
	}

	sockets: any = {};

	async componentDidMount() {
		storeInstance.subsribe(() => this.eventBus.emit(Chat.EVENTS.FLOW_CDU));

		if (this.sockets && !this.sockets[globalStore.activeChatId]) {
			this.sockets[globalStore.activeChatId] = await createChatSocket();
		}
	}

	async componentDidUpdate() {
		if (this.sockets && !this.sockets[globalStore.activeChatId]) {
			this.sockets[globalStore.activeChatId] = await createChatSocket();
		}
	}

	render() {
		this.setProps({
			activeChatId: globalStore.activeChatId,
			activeChat: globalStore.activeChat,
			messages: globalStore.messages?.[globalStore.activeChatId],
			ownerUserId: globalStore.user?.id,
		});

		const avatar = new Avatar({
			url: globalStore.activeChat?.avatarUrl,
		});

		this.children = {
			avatar,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
