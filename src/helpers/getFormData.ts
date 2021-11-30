export const getFormData = (e: Event) => {
	const formData = new FormData(e.target as HTMLFormElement);

	const formObject: any = {};

	for (const [key, value] of formData.entries()) {
		formObject[key] = value;
	}

	return formObject;
};
