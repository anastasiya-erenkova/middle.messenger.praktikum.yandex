import { storeSelector } from "../store";
import { UserAPI } from "../api/user-api";

export interface User {
	id: number;
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
}

export class UserController {
	public static async signIn(data: FormData) {
		await UserAPI.login(data);
	}

	public static async signUp(data: FormData) {
		await UserAPI.create(data);
	}

	public static async getInfo() {
		const response = await UserAPI.fetch();
		response && storeSelector("user", "set", response.json());
		return !!response;
	}

	public static async logout() {
		const response = await UserAPI.fetch();
		response && storeSelector("user", "set", {});
		return !!response;
	}
}
