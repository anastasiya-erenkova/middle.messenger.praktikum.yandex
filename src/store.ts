type Store = {
	[key: string]: any;
};

type Action = "get" | "set";

const globalStore: Store = {};

export const storeSelector = (
	field: string,
	action: Action = "get",
	data?: any
) => {
	if (action === "set") {
		globalStore[field] = data;
	}

	console.log(globalStore);

	return globalStore[field];
};
