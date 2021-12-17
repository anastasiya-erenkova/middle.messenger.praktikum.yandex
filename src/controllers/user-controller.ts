import { storeInstance } from "../store";
import { AuthAPI } from "../api/auth-api";
import { UserAPI } from "../api/user-api";
import { goToSignIn, goToProfile } from "../Router";

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
		await AuthAPI.login(data);
	}

	public static async signUp(data: FormData) {
		await AuthAPI.create(data);
	}

	public static async getInfo() {
		const response = await AuthAPI.fetch();
		response && storeInstance.setStore("user", response);
		return !!response;
	}

	public static async logout() {
		const response = await AuthAPI.logout();
		if (response) {
			storeInstance.setStore("user", {});
			goToSignIn();
		}
	}

	public static async editProfile(data: object) {
		const response = await UserAPI.editProfile(data);
		if (response) {
			storeInstance.setStore("user", response);
			goToProfile();
		}
	}

	public static async editPassword(data: object) {
		const response = await UserAPI.editPassword(data);
		if (response) {
			goToProfile();
		}
	}

	public static async changeAvatar(data: FormData) {
		const response = await UserAPI.changeAvatar(data);
		if (response) {
			storeInstance.setStore("user", response);
		}
	}
}
