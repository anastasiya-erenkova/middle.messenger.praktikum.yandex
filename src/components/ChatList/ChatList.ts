import { Chat } from "../../api/chats-api";
import { ChatsController } from "../../controllers/chats-controller";
import { goToProfile } from "../../Router";
import { storeInstance, globalStore } from "../../store";
import { Component, ComponentProps } from "../../utils/component";
import { parserDOM } from "../../utils/parserDOM";
import { Button } from "../Button";
import { ChatItem } from "../ChatItem";
import { Input } from "../Input";
import { Modal } from "../Modal";

import compileTemplate from "./ChatList.pug";
import "./ChatList.scss";

export interface Props extends Partial<HTMLDivElement>, ComponentProps {
	chats?: ChatItem[];
}

const getChats = (data: Chat[]) => data.map((chat) => new ChatItem(chat));

const getModal = () =>
	new Modal({
		title: "Создать чат",
		buttonText: "Создать",
		fields: [
			new Input({
				label: "Наименование чата",
				name: "title",
			}),
		],
	});

const getButton = () =>
	new Button({
		text: "Создать чат",
		small: true,
	});

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
		const chatList = parserDOM(compileTemplate(this.props));

		const linkProfile = chatList.querySelector(".chat-list__link");
		linkProfile?.addEventListener("click", () => {
			goToProfile();
		});

		this.children = {
			chats: getChats(globalStore.chats || []),
			modal: getModal(),
			addButton: getButton(),
		};

		const self = this;

		this.children.addButton.setProps({
			events: {
				click: () => {
					self.children?.modal.setProps({
						isOpen: true,
						onSubmit: async (data: { title: string }) => {
							try {
								await ChatsController.create(data.title);
								self.children?.modal.setProps({
									isOpen: false,
								});
								await ChatsController.fetch();
							} catch (err) {
								alert(err.responseText);
							}
						},
					});
				},
			},
		});

		return chatList;
	}
}
