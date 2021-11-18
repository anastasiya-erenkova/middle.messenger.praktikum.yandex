import { API } from "../utils/APIService";

export interface Chat {
	id: number;
	title: string;
}

interface ChatOptions {
	offset?: number;
	limit?: number;
	title?: string;
}

const root = "/chats";

export class UserAPI {
	public static fetch(data?: ChatOptions) {
		return API.get(root, data ? { data } : undefined);
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
}
