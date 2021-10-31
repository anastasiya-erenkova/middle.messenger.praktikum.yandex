export const onFormSubmit = (e: SubmitEvent) => {
	const formData = new FormData(e.target);

	const formObject: any = {};

	for (const [key, value] of formData.entries()) {
		formObject[key] = value;
	}
	console.log(formObject);
};
