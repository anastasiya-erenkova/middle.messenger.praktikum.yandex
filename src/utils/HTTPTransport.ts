enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

type Options = {
	method: string;
	data?: any;
	headers?: any;
	timeout?: number;
};

function queryStringify(data: any) {
	return `?${Object.keys(data)
		.map((key) => `${key}=${data[key].toString()}`)
		.join("&")}`;
}

export class HTTPTransport {
	get = <TResponse>(url: string, options: Options) => {
		const normalizeUrl = options.data
			? `${url}${queryStringify(options.data)}`
			: url;
		return this.request<TResponse>(
			normalizeUrl,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	};

	put = <TResponse>(url: string, options: Options) => {
		return this.request<TResponse>(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};

	post = <TResponse>(url: string, options: Options) => {
		return this.request<TResponse>(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	delete = <TResponse>(url: string, options: Options) => {
		return this.request<TResponse>(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	request = <TResponse>(
		url: string,
		options: Options = { method: "GET" },
		timeout = 5000
	): Promise<TResponse> => {
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
