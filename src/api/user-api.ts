import { API } from "../utils/APIService";

const root = "/user";

export class UserAPI {
	public static editProfile(data: FormData) {
		return API.put(`${root}/profile`, { data });
	}

	public static changeAvatar(data: FormData) {
		return API.put(`${root}/profile/avatar`, {
			data,
			isFormData: true,
		});
	}

	public static editPassword(data: FormData) {
		return API.put(`${root}/password`, { data });
	}
}
