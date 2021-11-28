import { ChatsAPI, Chat } from "../api/chats-api";
import { globalStore, storeInstance } from "../store";

export class ChatsController {
	public static async fetch() {
		const response = await ChatsAPI.fetch();
		response && storeInstance.setStore("chats", response);
		return !!response;
	}

	public static async create(title: Chat["title"]) {
		await ChatsAPI.create(title);
	}

	public static async getToken(id: Chat["id"]) {
		const response = await ChatsAPI.getToken(id);
		response &&
			storeInstance.setStore("tokens", {
				...globalStore.tokens,
				[id]: response.token,
			});
		return !!response;
	}
}
