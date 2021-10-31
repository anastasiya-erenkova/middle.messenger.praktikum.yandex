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
	method: string;
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

export class HTTPTransport {
	get = (url: string, options: Options) => {
		const normalizeUrl = options.data
			? `${url}${queryStringify(options.data)}`
			: url;
		return this.request(
			normalizeUrl,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	};

	put = (url: string, options: Options) => {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};

	post = (url: string, options: Options) => {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	delete = (url: string, options: Options) => {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	request = (
		url: string,
		options: Options = { method: "GET" },
		timeout = 5000
	): Promise<XMLHttpRequest> => {
		const { method, data, headers } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.timeout = timeout;

			if (headers) {
				Object.keys(headers).forEach((key) => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}

			xhr.onload = function () {
				resolve(xhr);
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
