import { ObjectExtension } from "./objectExtension";

enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

type Headers = {
	[key: string]: string;
};

type Options = {
	data?: object;
	headers?: Headers;
	timeout?: number;
};

function queryStringify(data: Options["data"]) {
	return data
		? `?${ObjectExtension.keys(data)
				.map((key) => `${key}=${data[key]}`)
				.join("&")}`
		: "";
}

export class HTTP {
	baseUrl;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	get = (url: string, options?: Options) => {
		const normalizeUrl = options?.data
			? `${url}${queryStringify(options.data)}`
			: url;

		return this.request(normalizeUrl, METHODS.GET, options);
	};

	put = (url: string, options?: Options) => {
		return this.request(url, METHODS.PUT, options);
	};

	post = (url: string, options?: Options) => {
		return this.request(url, METHODS.POST, options);
	};

	delete = (url: string, options?: Options) => {
		return this.request(url, METHODS.DELETE, options);
	};

	request = (
		url: string,
		method = "GET",
		options: Options = { data: {} }
	): Promise<XMLHttpRequest["response"]> => {
		const { data, headers } = options;

		const timeout = options.timeout ?? 5000;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, `${this.baseUrl}${url}`, true);
			xhr.timeout = timeout;
			xhr.withCredentials = true;

			if (headers) {
				Object.keys(headers).forEach((key) => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}

			if (data) {
				xhr.setRequestHeader("content-type", "application/json");
			}

			xhr.onload = function () {
				if (xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject(xhr);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
