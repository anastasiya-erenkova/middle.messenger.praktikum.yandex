import { API, Options } from "../utils/APIService";

export interface Chat {
	id: number;
	title: string;
	avatar: string;
}

interface ChatOptions extends Options {
	offset?: number;
	limit?: number;
	title?: string;
}

const root = "/chats";

export class ChatsAPI {
	public static fetch(options?: ChatOptions) {
		return API.get(root, options ? { data: options } : undefined);
	}

	public static create(title: Chat["title"]) {
		const data = {
			title,
		};
		return API.post(root, { data });
	}

	public static delete(id: Chat["id"]) {
		const data = {
			id,
		};
		return API.delete(root, { data });
	}

	public static getToken(id: Chat["id"]) {
		return API.post(`${root}/token/${id}`, {
			mode: "cors",
			credentials: "include",
		});
	}
}
