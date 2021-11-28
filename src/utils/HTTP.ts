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
	isFormData?: boolean;
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
		options: Options = { data: {}, isFormData: false }
	): Promise<XMLHttpRequest["response"]> => {
		const { data, headers, isFormData } = options;

		const timeout = options.timeout ?? 5000;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, `${this.baseUrl}${url}`, true);
			xhr.timeout = timeout;
			xhr.withCredentials = true;

			if (data && !isFormData) {
				xhr.setRequestHeader("content-type", "application/json");
			}

			if (headers) {
				Object.keys(headers).forEach((key) => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}

			xhr.onload = function () {
				if (xhr.status === 200) {
					const getResponse = () => {
						try {
							return JSON.parse(xhr.response);
						} catch {
							return xhr.response;
						}
					};
					resolve(getResponse());
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
				xhr.send(isFormData ? data : JSON.stringify(data));
			}
		});
	};
}
