import { renderDOM } from "../../utils/renderDOM";
import { ChatItem } from "../../components/ChatItem";
import { ChatList } from "../../components/ChatList";
import "./Chats.scss";

const chatsData = [
	{
		title: "Андрей",
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
		description: "Друзья, у меня для вас особенный выпуск новостей!(...)",
		date: "15:12",
		unreadCount: 4,
	},
];

const chats = chatsData.map((chat) => new ChatItem(chat));

const chatList = new ChatList({
	chats,
});

renderDOM(".render", chatList);
