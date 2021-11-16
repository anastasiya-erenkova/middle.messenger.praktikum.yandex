import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { ChatItem } from "../../components/ChatItem";
import { ChatList, Props as ChatListProps } from "../../components/ChatList";
import { Chat } from "../../components/Chat";

import compileTemplate from "./Messenger.pug";
import "./Messenger.scss";

interface Props extends Partial<HTMLDivElement>, ComponentProps {}

const chatsData = [
	{
		title: "Ооооочень длинное название",
		content: "Изображение",
		time: "10:49",
		unreadCount: 2,
	},
	{
		avatarUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMp0NZp_Dsz-ppU26mockuxbwNAlg5fVby8g&usqp=CAU",
		title: "Киноклуб",
		content: "Вы: стикер",
		time: "12:00",
	},
	{
		title: "Илья",
		content: "Друзья, у меня для вас особенный особенный выпуск новостей!",
		time: "15:12",
		unreadCount: 4,
	},
];

let activeChatIndex: ChatListProps["activeChatIndex"] = null;

const chats = chatsData.map(
	(chat, index) =>
		new ChatItem({
			...chat,
			active: activeChatIndex === index,
			events: {
				click: () => {
					setActiveChat(index);
				},
			},
		})
);

const chatList = new ChatList({
	chats,
	activeChatIndex,
});

const chat = new Chat({
	activeChat: getActiveChat(),
	messages: [
		{
			time: "11:56",
			content:
				"Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC",
		},
		{
			time: "12:07",
			content: "Круто!",
			isOwner: true,
		},
	],
});

function setActiveChat(newIndex: ChatListProps["activeChatIndex"]) {
	activeChatIndex = newIndex;

	chats.forEach((chat, index) => {
		chat.setProps({
			active: activeChatIndex === index,
		});
	});

	chat.setProps({
		activeChat: getActiveChat(),
	});
}

function getActiveChat() {
	return activeChatIndex !== null ? chats[activeChatIndex] : undefined;
}

export class Messenger extends Component<Props> {
	constructor(props: Props = {}) {
		super(props);
	}

	render() {
		this.children = {
			chatList,
			chat,
		};

		return parserDOM(compileTemplate(this.props));
	}
}
