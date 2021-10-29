import { renderDOM } from "../../utils/renderDOM";
import { ChatItem } from "../../components/ChatItem";
import { ChatList, Props as ChatListProps } from "../../components/ChatList";
import "./Chats.scss";

const chatsData = [
	{
		title: "Ооооочень длинное название",
		description: "Изображение",
		date: "10:49",
		unreadCount: 2,
	},
	{
		avatarUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMp0NZp_Dsz-ppU26mockuxbwNAlg5fVby8g&usqp=CAU",
		title: "Киноклуб",
		description: "Вы: стикер",
		date: "12:00",
	},
	{
		title: "Илья",
		description: "Друзья, у меня для вас особенный особенный выпуск новостей!",
		date: "15:12",
		unreadCount: 4,
	},
];

let activeChat: ChatListProps["activeChat"] = null;

const chats = chatsData.map(
	(chat, index) =>
		new ChatItem({
			...chat,
			active: activeChat === index,
			events: {
				click: () => {
					setActiveChat(index);
				},
			},
		})
);

const chatList = new ChatList({
	chats,
	activeChat,
});

function setActiveChat(newIndex: ChatListProps["activeChat"]) {
	activeChat = newIndex;

	chats.forEach((chat, index) => {
		chat.setProps({
			active: activeChat === index,
		});
	});
}

renderDOM(".render", chatList);
