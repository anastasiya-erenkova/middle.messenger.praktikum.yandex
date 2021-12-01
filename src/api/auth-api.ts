import { API } from "../utils/APIService";

const root = "/auth";

export class AuthAPI {
	public static fetch() {
		return API.get(`${root}/user`);
	}

	public static create(data: FormData) {
		return API.post(`${root}/signup`, { data });
	}

	public static login(data: FormData) {
		return API.post(`${root}/signin`, { data });
	}

	public static logout() {
		return API.post(`${root}/logout`);
	}
}
